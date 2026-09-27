export type AnswerState = 'present' | 'absent' | 'unknown' | 'unanswered';
export type Answers = Record<string, AnswerState>;

export interface SourceRecord {
  title: string;
  url: string;
  accessed?: string;
  release?: string;
  attribution?: string;
  license?: string;
}

export interface DiseaseAssociation {
  ruleId: string;
  label: string;
  diseaseId: string;
  version: string;
  sourceRefs: string[];
  inputLine: number;
}

export interface AtlasQuestion {
  featureId: string;
  sourceAttribute: string;
  label: string;
  question: string;
  section: string;
  answerType: 'presence';
  hpoId: string;
  help?: string;
  sourceRefs: string[];
  diseases: DiseaseAssociation[];
}

export interface AtlasSection { id: string; label: string }

export interface ExecutableRule {
  id: string;
  source: string;
  authoredSource: string;
  assetPath: string;
  label: string;
  diseaseId: string;
  version: string;
  sourceRefs: string[];
}

export interface CollectionManifest {
  schemaVersion: '1';
  id: string;
  title: string;
  description: string;
  version: string;
  limitations: string;
  associationContext: string;
  contentVersion: string;
  sections: AtlasSection[];
  questions: AtlasQuestion[];
  rules: ExecutableRule[];
  sources: Record<string, SourceRecord>;
}
