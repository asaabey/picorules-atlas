export type AnswerState = 'present' | 'absent';
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

export interface ReferenceImage {
  path: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  sha256: string;
  width: number;
  height: number;
}

export interface AtlasQuestion {
  featureId: string;
  evidenceKind?: 'family_history';
  sourceAttribute: string;
  label: string;
  question: string;
  section: string;
  answerType: 'presence';
  hpoId: string;
  help?: string;
  imageGuidance?: {
    category: 'radiology' | 'histopathology' | 'dermatology';
    modality: string;
    description: string;
    assetStatus: 'pending_verified_reference' | 'available_reference' | 'not_selected';
  };
  referenceImage?: ReferenceImage;
  sourceRefs: string[];
  diseases: DiseaseAssociation[];
}

export interface AtlasSection { id: string; label: string }

export interface ExecutableRule {
  id: string;
  source: string;
  scoring?: {
    model: string;
    status: 'research';
    absentWeight: 0;
    sourceRefs: string[];
    weights: Partial<Record<string, number>>;
  };
  demo?: {
    threshold: number;
    actionWhenFlagged: string;
    actionWhenNotFlagged: string;
  };
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
