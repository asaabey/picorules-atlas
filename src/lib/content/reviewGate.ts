export interface ReviewDecision {
  status: 'pending' | 'approved' | 'changes_requested';
  reviewer: string | null;
  reviewedAt: string | null;
  decisionNotes: string;
  wordingChanges?: string[];
}

export interface ReviewSignOff {
  name: string;
  qualification: string;
  date: string;
  contentVersion: string;
}

export interface ClinicalReviewRecord {
  schemaVersion: string;
  collectionId: string;
  contentVersion: string;
  featureReviews: Record<string, ReviewDecision>;
  globalReviews: Record<string, ReviewDecision>;
  signOffs: ReviewSignOff[];
}

export function assertClinicalReviewApproved(record: ClinicalReviewRecord, contentVersion: string): void {
  const decisions = [...Object.values(record.featureReviews), ...Object.values(record.globalReviews)];
  const pending = decisions.filter(decision => decision.status !== 'approved').length;
  if (pending) throw new Error(`${pending} clinical review decisions are not approved`);
  if (record.signOffs.length < 1) {
    throw new Error('one qualified clinical reviewer sign-off is required');
  }
  if (new Set(record.signOffs.map(signOff => signOff.name)).size !== record.signOffs.length) {
    throw new Error('sign-offs need distinct reviewers');
  }
  for (const signOff of record.signOffs) {
    if (!signOff.name?.trim() || !signOff.qualification?.trim() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(signOff.date) || signOff.contentVersion !== contentVersion) {
      throw new Error('sign-off needs name, qualification, date, and matching content version');
    }
  }
}
