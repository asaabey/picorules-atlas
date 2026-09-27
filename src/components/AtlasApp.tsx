'use client';

import { useEffect, useRef, useState } from 'react';
import { countAnswered, createAnswers, resetAnswers, setAnswer } from '../lib/assessment/answers';
import { buildAssessmentBundle } from '../lib/fhir';
import { buildHandoffBundle, type HandoffBundle } from '../lib/fhir/handoff';
import { parseCollectionRules, type DemoResult } from '../lib/runtime/ruleEngine';
import { createUuid } from '../lib/uuid';
import RuleblockViewer, { sourceLineId } from './RuleblockViewer';
import type {
  AnswerState,
  Answers,
  AtlasQuestion,
  AtlasSection,
  CollectionManifest,
  DiseaseAssociation,
} from '../lib/types';

type AppProps = { collections: Record<string, CollectionManifest> };

const ANSWER_OPTIONS: { value: Exclude<AnswerState, 'unanswered'>; label: string }[] = [
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
  { value: 'unknown', label: 'Unknown / not assessed' },
];

function Brand({ small = false }: { small?: boolean }) {
  return (
    <div className={`brand${small ? ' brand--small' : ''}`} aria-label="Picorules Atlas">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="brand-wordmark">
        <strong>picorules</strong>
        <span>ATLAS</span>
      </span>
    </div>
  );
}

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function uniqueDiseaseNames(collection: CollectionManifest): string[] {
  return Array.from(new Set(collection.questions.flatMap(question => question.diseases.map(disease => disease.label))));
}

function CollectionSelector({
  collections,
  onSelect,
  error,
}: {
  collections: CollectionManifest[];
  onSelect: (id: string) => void;
  error: string | null;
}) {
  return (
    <div className="site-shell landing-page">
      <header className="site-header">
        <Brand />
        <span className="header-note">Clinical assessment scaffold</span>
      </header>

      <main id="main-content">
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> A more considered way to assess</div>
            <h1 id="landing-title">Every finding<br /><em>in context.</em></h1>
            <p className="hero-intro">
              Picorules Atlas brings related clinical features into one structured assessment,
              with the source and disease context close at hand.
            </p>
            <div className="hero-principles" aria-label="Assessment characteristics">
              <span><span className="principle-dot" /> One question per finding</span>
              <span><span className="principle-dot" /> Source linked context</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-center"><span className="art-cross">✳</span><span>ATLAS</span></div>
            <div className="art-label art-label-one">Kidney</div>
            <div className="art-label art-label-two">Skin &amp; sweating</div>
            <div className="art-label art-label-three">Neurological history</div>
          </div>
        </section>

        <section className="collection-area" aria-labelledby="collections-title">
          <div className="section-heading">
            <div>
              <p className="overline">01 / COLLECTIONS</p>
              <h2 id="collections-title">Choose an assessment</h2>
            </div>
            <p>Each collection brings its own questions and clinical context.</p>
          </div>
          {error && <p className="inline-error" role="alert">{error}</p>}
          <div className="collection-grid">
            {collections.map((collection, index) => {
              const diseases = uniqueDiseaseNames(collection);
              return (
                <article className="collection-card" key={collection.id}>
                  <div className="collection-card-top">
                    <span className="collection-number">COLLECTION / {String(index + 1).padStart(2, '0')}</span>
                    <span className="collection-symbol" aria-hidden="true">✳</span>
                  </div>
                  <div className="collection-card-body">
                    <p className="card-kicker">CLINICAL COLLECTION</p>
                    <h3>{collection.title}</h3>
                    <p>{collection.description}</p>
                    <div className="card-meta">
                      <span>{collection.questions.length} features</span>
                      <span>{diseases.length} associated diseases</span>
                    </div>
                    <div className="disease-preview" aria-label="Included diseases">
                      {diseases.map(name => <span key={name}>{name}</span>)}
                    </div>
                  </div>
                  <button className="card-action" type="button" onClick={() => onSelect(collection.id)}>
                    Open assessment <ArrowIcon />
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <span>Picorules Atlas</span>
        <span>Structured findings, with context.</span>
      </footer>
    </div>
  );
}

function DiseaseContext({
  disease,
  question,
  collection,
}: {
  disease: DiseaseAssociation;
  question: AtlasQuestion;
  collection: CollectionManifest;
}) {
  const refs = Array.from(new Set([...question.sourceRefs, ...disease.sourceRefs]))
    .map(ref => ({ ref, source: collection.sources[ref] }))
    .filter(item => item.source);

  return (
    <details className="disease-context">
      <summary>
        <span>{disease.label}</span>
        <span className="context-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="context-body">
        <p><strong>{question.label}</strong> is a feature associated with {disease.label}. {collection.associationContext}</p>
        {question.help && <p>{question.help}</p>}
        <a className="input-source-link" href={`#${sourceLineId(disease.ruleId, disease.inputLine)}`}>
          View the {question.featureId} input declaration in {disease.ruleId}
        </a>
        {refs.length > 0 && (
          <div className="context-sources">
            <span>Sources</span>
            {refs.map(({ ref, source }) => (
              <a key={ref} href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title} <ArrowIcon diagonal />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

function QuestionCard({
  question,
  number,
  answer,
  collection,
  onAnswer,
}: {
  question: AtlasQuestion;
  number: number;
  answer: AnswerState;
  collection: CollectionManifest;
  onAnswer: (featureId: string, answer: AnswerState) => void;
}) {
  const titleId = `question-title-${question.featureId}`;
  const promptId = `question-prompt-${question.featureId}`;

  return (
    <article className="question-card" aria-labelledby={titleId}>
      <div className="question-index">{String(number).padStart(2, '0')}</div>
      <div className="question-content">
        <div className="question-heading">
          <h4 id={titleId}>{question.label}</h4>
          <span className="question-code">{question.hpoId}</span>
        </div>
        <p id={promptId} className="question-prompt">{question.question}</p>
        <fieldset className="answer-group" aria-describedby={promptId}>
          <legend className="sr-only">Answer for {question.label}</legend>
          {ANSWER_OPTIONS.map(option => (
            <label className={`answer-option${answer === option.value ? ' answer-option--selected' : ''}`} key={option.value}>
              <input
                type="radio"
                name={`answer-${question.featureId}`}
                value={option.value}
                checked={answer === option.value}
                onChange={() => onAnswer(question.featureId, option.value)}
              />
              <span className="answer-radio" aria-hidden="true" />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
        {question.diseases.length > 0 && (
          <div className="association-list">
            <span className="association-caption">Associated with</span>
            {question.diseases.map(disease => (
              <DiseaseContext key={disease.ruleId} disease={disease} question={question} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Section({
  section,
  questions,
  collection,
  answers,
  questionNumbers,
  onAnswer,
}: {
  section: AtlasSection;
  questions: AtlasQuestion[];
  collection: CollectionManifest;
  answers: Answers;
  questionNumbers: Map<string, number>;
  onAnswer: (featureId: string, answer: AnswerState) => void;
}) {
  if (questions.length === 0) return null;
  return (
    <section id={section.id} className="assessment-section" aria-labelledby={`section-${section.id}`}>
      <div className="assessment-section-heading">
        <div>
          <p className="overline">SECTION {String(collection.sections.findIndex(item => item.id === section.id) + 1).padStart(2, '0')}</p>
          <h3 id={`section-${section.id}`}>{section.label}</h3>
        </div>
        <span>{questions.length} {questions.length === 1 ? 'feature' : 'features'}</span>
      </div>
      <div className="question-list">
        {questions.map(question => (
          <QuestionCard
            key={question.featureId}
            question={question}
            number={questionNumbers.get(question.featureId) ?? 0}
            answer={answers[question.featureId] ?? 'unanswered'}
            collection={collection}
            onAnswer={onAnswer}
          />
        ))}
      </div>
    </section>
  );
}

function LeaveDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    cancelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === cancelRef.current) {
          event.preventDefault();
          confirmRef.current?.focus();
        } else if (!event.shiftKey && document.activeElement === confirmRef.current) {
          event.preventDefault();
          cancelRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [onCancel]);

  return (
    <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onCancel(); }}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="leave-title" aria-describedby="leave-description">
        <span className="dialog-icon" aria-hidden="true">↗</span>
        <h2 id="leave-title">Leave this assessment?</h2>
        <p id="leave-description">Your answers will be discarded when you return to collections.</p>
        <div className="dialog-actions">
          <button type="button" className="button-secondary" onClick={onCancel} ref={cancelRef}>Keep assessing</button>
          <button type="button" className="button-primary" onClick={onConfirm} ref={confirmRef}>Discard answers</button>
        </div>
      </div>
    </div>
  );
}

function Assessment({
  collection,
  answers,
  onAnswer,
  onReset,
  onLeave,
  onReview,
}: {
  collection: CollectionManifest;
  answers: Answers;
  onAnswer: (featureId: string, answer: AnswerState) => void;
  onReset: () => void;
  onLeave: () => void;
  onReview: () => void;
}) {
  const diseases = uniqueDiseaseNames(collection);
  const answered = countAnswered(collection, answers);
  const questionNumbers = new Map(collection.questions.map((question, index) => [question.featureId, index + 1]));

  return (
    <div className="site-shell assessment-page">
      <header className="site-header assessment-header">
        <Brand small />
        <button className="header-back" type="button" onClick={onLeave}>
          <span aria-hidden="true">←</span> All collections
        </button>
      </header>
      <main id="main-content">
        <div className="assessment-hero">
          <div className="assessment-hero-content">
            <div className="eyebrow"><span className="eyebrow-line" /> ASSESSMENT / {collection.id.toUpperCase()}</div>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            <div className="assessment-meta">
              <span>{collection.questions.length} features</span>
              <span>{collection.sections.length} sections</span>
              <span>Version {collection.version}</span>
            </div>
          </div>
          <div className="hero-monogram" aria-hidden="true">✳</div>
        </div>

        <div className="assessment-layout">
          <aside className="assessment-sidebar" aria-label="Assessment navigation">
            <div className="sidebar-sticky">
              <p className="overline">YOUR ASSESSMENT</p>
              <div className="progress-number"><strong>{answered}</strong><span> / {collection.questions.length} answered</span></div>
              <div className="progress-track" role="progressbar" aria-valuenow={answered} aria-valuemin={0} aria-valuemax={collection.questions.length} aria-label="Questions answered">
                <span style={{ width: `${collection.questions.length ? (answered / collection.questions.length) * 100 : 0}%` }} />
              </div>
              <nav className="section-nav" aria-label="Assessment sections">
                <p>SECTIONS</p>
                {collection.sections.map((section, index) => {
                  const count = collection.questions.filter(question => question.section === section.id).length;
                  return count > 0 ? (
                    <a key={section.id} href={`#${section.id}`}>
                      <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
                      <span>{section.label}</span>
                      <span className="nav-count">{count}</span>
                    </a>
                  ) : null;
                })}
              </nav>
              <a className="sidebar-rule-link" href="#ruleblocks">View collection ruleblocks</a>
              <p className="sidebar-note">Answers are held in this browser tab and clear on reload or close.</p>
            </div>
          </aside>

          <div className="assessment-main">
            <div className="assessment-intro">
              <div>
                <p className="overline">STRUCTURED FINDINGS</p>
                <h2>Clinical features</h2>
              </div>
              <p>Record what is known for each finding. You can leave any question unanswered.</p>
            </div>
            <div className="context-banner">
              <span className="banner-icon" aria-hidden="true">i</span>
              <div>
                <strong>Context, not a conclusion</strong>
                <p>{collection.limitations}</p>
              </div>
            </div>
            <div className="included-diseases" aria-label="Included diseases">
              <span>Included diseases</span>
              {diseases.map(name => <span className="disease-pill" key={name}>{name}</span>)}
            </div>
            {collection.sections.map(section => (
              <Section
                key={section.id}
                section={section}
                questions={collection.questions.filter(question => question.section === section.id)}
                collection={collection}
                answers={answers}
                questionNumbers={questionNumbers}
                onAnswer={onAnswer}
              />
            ))}
            <div className="assessment-end">
              <div><span aria-hidden="true">✳</span><strong>End of questions</strong><p>Review all answers before running the demonstration.</p></div>
              <div className="flow-actions">
                <button type="button" className="reset-button" onClick={onReset}>Reset answers</button>
                <button type="button" className="button-primary" onClick={onReview}>Review findings</button>
              </div>
            </div>
            <RuleblockViewer collection={collection} />
          </div>
        </div>
      </main>
      <footer className="site-footer"><span>Picorules Atlas</span><span>Questions are generated from the selected collection.</span></footer>
    </div>
  );
}

const answerLabels: Record<AnswerState, string> = {
  present: 'Present', absent: 'Absent', unknown: 'Unknown / not assessed', unanswered: 'Unanswered',
};

function FlowPage({ collection, step, onLeave, children }: {
  collection: CollectionManifest;
  step: 'review' | 'results';
  onLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell assessment-page">
      <header className="site-header assessment-header">
        <Brand small />
        <button className="header-back" type="button" onClick={onLeave}>
          <span aria-hidden="true">←</span> All collections
        </button>
      </header>
      <main id="main-content" className="flow-main">
        <p className="overline">ASSESSMENT / {collection.id.toUpperCase()} / {step.toUpperCase()}</p>
        <h1 id="flow-title" tabIndex={-1}>{step === 'review' ? 'Review findings' : 'Illustrative rule output'}</h1>
        <p className="flow-version">{collection.title} · Collection {collection.version} · Content {collection.contentVersion}</p>
        {children}
      </main>
      <footer className="site-footer"><span>Picorules Atlas</span><span>Local demonstration</span></footer>
    </div>
  );
}

function ReviewPage({ collection, answers, onEdit, onRun, onLeave, error }: {
  collection: CollectionManifest;
  answers: Answers;
  onEdit: () => void;
  onRun: () => void;
  onLeave: () => void;
  error: string | null;
}) {
  return (
    <FlowPage collection={collection} step="review" onLeave={onLeave}>
      <p className="flow-intro">Check the recorded findings. Unknown and unanswered remain distinct.
        The demonstration counts only findings marked present; it is not a clinical assessment.</p>
      <div className="review-list">
        {collection.questions.map(question => (
          <div className="review-row" key={question.featureId}>
            <div><strong>{question.label}</strong><span>{question.diseases.map(d => d.label).join(', ')}</span></div>
            <span className={`review-answer review-answer--${answers[question.featureId] ?? 'unanswered'}`}>
              {answerLabels[answers[question.featureId] ?? 'unanswered']}
            </span>
          </div>
        ))}
      </div>
      {error && <p className="inline-error" role="alert">{error}</p>}
      <div className="flow-actions">
        <button type="button" className="button-secondary" onClick={onEdit}>Edit answers</button>
        <button type="button" className="button-primary" onClick={onRun}>Run demonstration</button>
      </div>
    </FlowPage>
  );
}

function ResultsPage({ collection, results, onEdit, onDownload, onLeave }: {
  collection: CollectionManifest;
  results: DemoResult[];
  onEdit: () => void;
  onDownload: () => void;
  onLeave: () => void;
}) {
  return (
    <FlowPage collection={collection} step="results" onLeave={onLeave}>
      <div className="context-banner flow-warning"><span className="banner-icon" aria-hidden="true">i</span><div>
        <strong>Proof of concept only</strong>
        <p>These ruleblocks count present features and trigger a review prompt at an illustrative threshold of two.
          This is a simple count, not a diagnostic criterion, disease probability, validated clinical score,
          or advice about tests or treatment. A low count does not exclude disease.</p>
      </div></div>
      <div className="result-list">
        {results.map(result => {
          const rule = collection.rules.find(item => item.id === result.ruleId)!;
          return <section className="result-card" key={result.ruleId} aria-labelledby={`result-${result.ruleId}`}>
            <p className="overline">AUTHORED RULE / {result.ruleId} / v{result.ruleVersion}</p>
            <h2 id={`result-${result.ruleId}`}>{result.label}</h2>
            <p className="result-status">{result.flagged
              ? `Possible diagnosis for review: ${result.label}`
              : 'No possible diagnosis raised by this rule'}</p>
            <p><strong>Rule score:</strong> {result.presentCount} / {result.totalFeatures} linked findings marked present.
              The authored Picorules rule counts those inputs and raises a candidate when the count is at least {result.threshold}.</p>
            <p><strong>Contributing findings:</strong> {result.presentFeatures.length
              ? result.presentFeatures.map(feature => feature.label).join(', ') : 'None marked present'}.</p>
            <p><strong>Next action from the ruleblock:</strong> {result.action}
              {' '}The rule output selects this authored text.</p>
            <a href={rule.assetPath} target="_blank" rel="noopener noreferrer">
              Read exact authored ruleblock <span className="sr-only">(opens in a new tab)</span>
            </a>
          </section>;
        })}
      </div>
      <div className="flow-handoff">
        <h2>Assessment handoff</h2>
        <p>Download the FHIR R4 bundle containing the questionnaire, answers, one score Observation per rule,
          and a ClinicalImpression with possible diagnoses for review. It contains an anonymous Patient reference
          and no confirmed Condition. The file is created in this browser when you choose to download it.</p>
        <div className="flow-actions">
          <button type="button" className="button-secondary" onClick={onEdit}>Edit answers</button>
          <button type="button" className="button-primary" onClick={onDownload}>Download FHIR bundle</button>
        </div>
      </div>
    </FlowPage>
  );
}

export default function AtlasApp({ collections }: AppProps) {
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [view, setView] = useState<'questions' | 'review' | 'results'>('questions');
  const [result, setResult] = useState<{ bundle: HandoffBundle; items: DemoResult[] } | null>(null);
  const availableCollections = Object.values(collections);
  const selected = collectionId ? collections[collectionId] : null;

  useEffect(() => {
    if (view !== 'questions' && selected) {
      window.scrollTo(0, 0);
      document.getElementById('flow-title')?.focus();
    }
  }, [view, selected]);

  const selectCollection = (id: string) => {
    const collection = collections[id];
    if (!collection) return;
    try {
      // Parse the generated executable payload in the browser before opening an assessment.
      parseCollectionRules(collection);
      setAnswers(createAnswers(collection));
      setError(null);
      setSessionId(createUuid());
      setCollectionId(id);
      setView('questions');
      setResult(null);
      window.scrollTo(0, 0);
    } catch (cause) {
      console.error('Could not initialise the selected Atlas collection', cause);
      setError('This assessment could not be opened. Please try again later.');
    }
  };

  const updateAnswer = (featureId: string, answer: AnswerState) => {
    if (!selected) return;
    setAnswers(previous => setAnswer(selected, previous, featureId, answer));
    setResult(null);
  };

  const clearAssessment = () => {
    setAnswers({});
    setCollectionId(null);
    setSessionId(null);
    setView('questions');
    setResult(null);
    setError(null);
    window.scrollTo(0, 0);
  };

  const runDemonstration = () => {
    if (!selected || !sessionId) return;
    try {
      const bundle = buildAssessmentBundle(selected, answers, sessionId);
      const handoff = buildHandoffBundle(selected, bundle);
      setResult({ bundle: handoff.bundle, items: handoff.results });
      setError(null);
      setView('results');
    } catch (cause) {
      console.error('Could not evaluate the selected Atlas collection', cause);
      setError('The demonstration could not run. Please review the authored rules.');
    }
  };

  const downloadBundle = () => {
    if (!selected || !result) return;
    const blob = new Blob([`${JSON.stringify(result.bundle, null, 2)}\n`], { type: 'application/fhir+json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `atlas-${selected.id}-${selected.contentVersion}-assessment.fhir.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const leave = () => {
    if (Object.values(answers).some(answer => answer !== 'unanswered')) {
      setLeaveOpen(true);
    } else {
      clearAssessment();
    }
  };

  const confirmLeave = () => {
    clearAssessment();
    setLeaveOpen(false);
  };

  return (
    <>
      {selected && view === 'results' && result ? (
        <ResultsPage collection={selected} results={result.items} onEdit={() => { setResult(null); setView('questions'); }} onDownload={downloadBundle} onLeave={leave} />
      ) : selected && view === 'review' ? (
        <ReviewPage collection={selected} answers={answers} onEdit={() => setView('questions')} onRun={runDemonstration} onLeave={leave} error={error} />
      ) : selected ? (
        <Assessment collection={selected} answers={answers} onAnswer={updateAnswer} onReset={() => { setAnswers(resetAnswers(selected)); setResult(null); }} onLeave={leave} onReview={() => { setError(null); setView('review'); }} />
      ) : (
        <CollectionSelector collections={availableCollections} onSelect={selectCollection} error={error} />
      )}
      {leaveOpen && <LeaveDialog onCancel={() => setLeaveOpen(false)} onConfirm={confirmLeave} />}
    </>
  );
}
