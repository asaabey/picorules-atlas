import { EadvDataAdapter, evaluate, parse } from 'picorules-compiler-js-core';
import type { ParsedRuleblock } from 'picorules-compiler-js-core';
import type { AssessmentBundle } from '../fhir';
import type { CollectionManifest } from '../types';
import { observationsToEadv } from './featureAdapter';

/** Initialise only the selected collection's executable inputs in the browser. */
export function parseCollectionRules(manifest: CollectionManifest): ParsedRuleblock[] {
  return parse(manifest.rules.map(rule => ({ name: rule.id, text: rule.source, isActive: true })));
}

export interface DemoResult {
  ruleId: string;
  label: string;
  ruleVersion: string;
  threshold: number;
  presentCount: number;
  totalFeatures: number;
  presentFeatures: { featureId: string; label: string }[];
  flagged: boolean;
  action: string;
}

/** Execute the selected authored ruleblocks against the assessment's FHIR observations. */
export function evaluateCollectionDemo(
  manifest: CollectionManifest,
  bundle: AssessmentBundle,
): DemoResult[] {
  const values = observationsToEadv(manifest, bundle);
  const adapter = new EadvDataAdapter(Object.entries(values).map(([att, val]) => ({
    eid: bundle.id, att, dt: null, val,
  })));
  const parsed = new Map(parseCollectionRules(manifest).map(rule => [rule.name, rule]));
  return manifest.rules.filter(rule => rule.demo).map(rule => {
    const demo = rule.demo!;
    const source = parsed.get(rule.id);
    if (!source) throw new Error(`Missing parsed rule ${rule.id}`);
    const output = evaluate(source, adapter);
    const linked = manifest.questions.filter(question =>
      question.diseases.some(disease => disease.ruleId === rule.id));
    const presentFeatures = linked.filter(question => values[question.sourceAttribute] === 1)
      .map(question => ({ featureId: question.featureId, label: question.label }));
    const presentCount = presentFeatures.length;
    const flagged = presentCount >= demo.threshold;
    if (output.present_feature_count !== presentCount ||
      output.demo_review_prompt !== Number(flagged) || output[rule.id] !== Number(flagged)) {
      throw new Error(`Illustrative rule output does not match declared inputs for ${rule.id}`);
    }
    return {
      ruleId: rule.id, label: rule.label, ruleVersion: rule.version,
      threshold: demo.threshold, presentCount, totalFeatures: linked.length,
      presentFeatures, flagged,
      action: flagged ? demo.actionWhenFlagged : demo.actionWhenNotFlagged,
    };
  });
}
