import { evaluate, evaluateAll, parse } from 'picorules-compiler-js-core';
import type { ParsedRuleblock } from 'picorules-compiler-js-core';
import type { CollectionManifest } from '../types';

/** Initialise only the selected collection's executable inputs in the browser. */
export function parseCollectionRules(manifest: CollectionManifest): ParsedRuleblock[] {
  return parse(manifest.rules.map(rule => ({ name: rule.id, text: rule.source, isActive: true })));
}

// Clinical evaluation remains deferred; these stay behind the runtime boundary.
export { evaluate, evaluateAll };
