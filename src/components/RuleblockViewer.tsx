import type { CollectionManifest, ExecutableRule } from '../lib/types';

export function sourceLineId(ruleId: string, line: number): string {
  return `rule-${ruleId}-line-${line}`;
}

function AuthoredSource({ rule }: { rule: ExecutableRule }) {
  const lines = rule.authoredSource.split('\n');
  return (
    <pre className="rule-source" aria-label={`${rule.id} authored source`}><code>
      {lines.map((line, index) => (
        <span id={sourceLineId(rule.id, index + 1)} tabIndex={-1} key={index}>
          {line}{index < lines.length - 1 ? '\n' : ''}
        </span>
      ))}
    </code></pre>
  );
}

export default function RuleblockViewer({ collection }: { collection: CollectionManifest }) {
  return (
    <section id="ruleblocks" className="ruleblock-viewer" aria-labelledby="ruleblocks-title">
      <p className="overline">AUTHORED CONTENT / {collection.id.toUpperCase()}</p>
      <h2 id="ruleblocks-title">Ruleblocks in this collection</h2>
      <p className="ruleblock-intro">
        These ruleblocks declare features used by the questions and calculate weighted phenotype matching scores. They do not contain diagnostic logic or determine whether a patient has a disease.
      </p>
      <p className="ruleblock-version">Collection version {collection.version} · Content version <code>{collection.contentVersion}</code></p>
      <nav className="ruleblock-nav" aria-label="Ruleblocks in this collection">
        {collection.rules.map(rule => <a href={`#rule-${rule.id}`} key={rule.id}>{rule.label}</a>)}
      </nav>
      {collection.rules.map(rule => (
        <article className="ruleblock-card" id={`rule-${rule.id}`} key={rule.id} aria-labelledby={`rule-title-${rule.id}`}>
          <div className="ruleblock-heading">
            <div>
              <p className="overline">RULEBLOCK / {rule.id}</p>
              <h3 id={`rule-title-${rule.id}`}>{rule.label}</h3>
              <p>Rule ID <code>{rule.id}</code> · Disease ID {rule.diseaseId} · Version {rule.version}</p>
            </div>
            <a href={rule.assetPath} target="_blank" rel="noopener noreferrer">
              Open exact .prb source <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="ruleblock-references">
            <strong>References</strong>
            {rule.sourceRefs.map(ref => {
              const source = collection.sources[ref];
              return source ? (
                <a href={source.url} target="_blank" rel="noopener noreferrer" key={ref}>
                  {source.title}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null;
            })}
          </div>
          <AuthoredSource rule={rule} />
        </article>
      ))}
      <details className="source-provenance">
        <summary>Source and license details</summary>
        <div>
          {Object.entries(collection.sources).filter(([id]) =>
            collection.rules.some(rule => rule.sourceRefs.includes(id))).map(([id, source]) => (
            <section key={id} aria-label={source.title}>
              <h3><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></h3>
              {source.release && <p>Release: {source.release}</p>}
              {source.accessed && <p>Accessed: {source.accessed}</p>}
              {source.attribution && <p>{source.attribution}</p>}
              {source.license && <p>License: {source.license}</p>}
            </section>
          ))}
        </div>
      </details>
    </section>
  );
}
