import { describe, expect, it } from 'vitest';
import {
  assertClinicalReviewApproved,
  type ClinicalReviewRecord,
} from '../src/lib/content/reviewGate';

const version = 'candidate-version';
const approved = {
  status: 'approved' as const,
  reviewer: 'Clinical reviewer',
  reviewedAt: '2026-09-27',
  decisionNotes: 'Reviewed candidate wording and mapping.',
};

function record(): ClinicalReviewRecord {
  return {
    schemaVersion: '1', collectionId: 'ikd', contentVersion: version,
    featureReviews: { proteinuria: { ...approved } },
    globalReviews: { limitations: { ...approved } },
    signOffs: [{
      name: 'Clinical reviewer', qualification: 'Nephrologist',
      date: '2026-09-27', contentVersion: version,
    }],
  };
}

describe('clinical review approval gate', () => {
  it('accepts one qualified clinical reviewer after all decisions are approved', () => {
    expect(() => assertClinicalReviewApproved(record(), version)).not.toThrow();
  });

  it('still requires a sign-off and matching final content version', () => {
    const unsigned = record();
    unsigned.signOffs = [];
    expect(() => assertClinicalReviewApproved(unsigned, version)).toThrow(/one qualified clinical reviewer/);
    expect(() => assertClinicalReviewApproved(record(), 'changed-version')).toThrow(/matching content version/);
  });

  it('does not treat pending decisions as approval', () => {
    const incomplete = record();
    incomplete.featureReviews.proteinuria.status = 'pending';
    expect(() => assertClinicalReviewApproved(incomplete, version)).toThrow(/decisions are not approved/);
  });
});
