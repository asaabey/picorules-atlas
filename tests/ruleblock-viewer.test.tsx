import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RuleblockViewer from '../src/components/RuleblockViewer';
import type { CollectionManifest } from '../src/lib/types';

describe('read-only ruleblock source', () => {
  it('escapes authored markup and renders only rules belonging to the selected collection', () => {
    const source = '/* <script>alert("unsafe")</script> */\nfeature => eadv.phen_feature.val.last();\n';
    const manifest: CollectionManifest = {
      schemaVersion: '1', id: 'one', title: 'One', description: 'Fixture', version: '1',
      limitations: 'Candidate content only.', associationContext: 'Background context only.',
      contentVersion: 'content-one', sections: [], questions: [], sources: {},
      rules: [{
        id: 'disease_one', source: 'feature => eadv.phen_feature.val.last();',
        authoredSource: source, assetPath: '/generated/ruleblocks/one/disease_one-content-one.prb',
        label: 'Disease one', diseaseId: 'ORPHA:1', version: '0.1', sourceRefs: [],
      }],
    };
    const html = renderToStaticMarkup(<RuleblockViewer collection={manifest} />);
    expect(html).toContain('&lt;script&gt;alert');
    expect(html).not.toContain('<script>');
    expect(html).toContain('rule-disease_one-line-2');
    expect(html).toContain('content-one');
    expect(html).not.toContain('disease_two');
  });
});
