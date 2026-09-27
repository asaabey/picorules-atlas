import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import weights from '../benchmarks/ikd/adtkd-weights.json';
import evidence from '../reviews/ikd/adtkd-evidence.json';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { evaluateCollectionDemo } from '../src/lib/runtime/ruleEngine';
import type { CollectionManifest } from '../src/lib/types';

const manifest = collections.ikd as CollectionManifest;

describe('ADTKD assessments', () => {
  it('executes the extracted weights and shares questions across both diseases', () => {
    const answers = { gout: 'present', hyperuricemia: 'present' } as const;
    const results = evaluateCollectionDemo(manifest, buildAssessmentBundle(
      manifest, answers, '83a7d563-2e53-4f7b-9052-3e87a904d110',
    ));
    for (const ruleId of ['ikd_adtkd_umod', 'ikd_adtkd_muc1']) {
      const rows = weights.weights.filter(row => row.ruleId === ruleId);
      const rule = manifest.rules.find(rule => rule.id === ruleId)!;
      expect(Object.values(rule.scoring!.weights).filter(weight => weight! > 0)).toHaveLength(rows.length);
      for (const row of rows) {
        expect(rule.scoring!.weights[row.featureId]).toBe(row.weight);
        expect(evidence.associations).toContainEqual(expect.objectContaining({
          ruleId, featureId: row.featureId, diseaseId: row.diseaseId, hpoId: row.hpoId,
        }));
      }
      const expected = rows.filter(row => row.featureId in answers).reduce((sum, row) => sum + row.weight, 0);
      expect(results.find(result => result.ruleId === ruleId)?.weightedScore).toBeCloseTo(expected, 6);
    }
    expect(manifest.questions.filter(question => question.featureId === 'hyperuricemia')).toHaveLength(1);
    expect(manifest.questions.find(question => question.featureId === 'hyperuricemia')?.diseases).toHaveLength(3);
  });

  it('retains modality metadata without showing generic ADTKD images', () => {
    for (const id of ['renal_corticomedullary_cysts', 'hyperechogenic_kidneys', 'renal_tubular_atrophy']) {
      const question = manifest.questions.find(question => question.featureId === id)!;
      expect(question.imageGuidance?.assetStatus).toBe('not_selected');
      expect(question.imageGuidance?.modality).toBeTruthy();
      expect(question.referenceImage).toBeUndefined();
    }
  });
});
