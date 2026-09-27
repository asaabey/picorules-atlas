import JSON5 from 'json5';
import { parse, RuleType } from 'picorules-compiler-js-core';
import type { ParsedComputeStatement, ParsedFetchStatement } from 'picorules-compiler-js-core';
import type {
  AtlasQuestion,
  AtlasSection,
  CollectionManifest,
  DiseaseAssociation,
  SourceRecord,
} from '../types';

export interface CollectionDefinition {
  schemaVersion: string;
  id: string;
  title: string;
  description: string;
  version: string;
  limitations: string;
  associationContext: string;
  sections: AtlasSection[];
  rules: string[];
}

export interface RuleSource { path: string; text: string }

interface Statement { text: string; line: number }

function fail(path: string, line: number, message: string): never {
  throw new Error(`${path}:${line}: ${message}`);
}

/** Split only at top-level semicolons; quoted punctuation and comments are inert. */
export function splitStatements(source: string, path: string): Statement[] {
  const statements: Statement[] = [];
  let text = '';
  let line = 1;
  let startLine = 1;
  let quote = '';
  let escaped = false;
  let comment: 'line' | 'block' | '' = '';
  const stack: string[] = [];
  const closes: Record<string, string> = { '(': ')', '[': ']', '{': '}' };

  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === '\n') line++;
    if (comment === 'line') {
      if (ch === '\n') { comment = ''; text += '\n'; }
      continue;
    }
    if (comment === 'block') {
      if (ch === '*' && next === '/') { comment = ''; i++; }
      else if (ch === '\n') text += '\n';
      continue;
    }
    if (quote) {
      text += ch;
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') { comment = 'line'; i++; continue; }
    if (ch === '/' && next === '*') { comment = 'block'; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; text += ch; continue; }
    if (ch in closes) { stack.push(closes[ch]); text += ch; continue; }
    if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.pop() !== ch) fail(path, line, `unbalanced ${ch}`);
      text += ch;
      continue;
    }
    if (ch === ';' && stack.length === 0) {
      if (text.trim()) statements.push({ text: text.trim(), line: startLine });
      text = '';
      startLine = line;
      continue;
    }
    if (!text.trim() && !/\s/.test(ch)) startLine = line;
    text += ch;
  }
  if (comment === 'block') fail(path, line, 'unclosed block comment');
  if (quote) fail(path, line, 'unclosed string');
  if (stack.length) fail(path, line, 'unclosed nested value');
  if (text.trim()) fail(path, startLine, 'statement is missing a terminating semicolon');
  return statements;
}

function directive(statement: Statement, path: string): { kind: string; name: string; value: unknown } {
  const match = /^#(define_ruleblock|define_attribute)\s*\(\s*([a-z][a-z0-9_]*)\s*,([\s\S]*)\)$/.exec(statement.text);
  if (!match) fail(path, statement.line, 'invalid Atlas directive');
  try {
    return { kind: match[1], name: match[2], value: JSON5.parse(match[3]) };
  } catch (error) {
    fail(path, statement.line, `invalid data-only directive value: ${(error as Error).message}`);
  }
}

function object(value: unknown, path: string, line: number, name: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, line, `${name} must be an object`);
  return value as Record<string, unknown>;
}

function string(value: unknown, path: string, line: number, name: string): string {
  if (typeof value !== 'string' || !value.trim()) fail(path, line, `${name} must be a nonempty string`);
  if (/<\/?[a-z][^>]*>/i.test(value)) fail(path, line, `${name} must be plain text without HTML`);
  return value;
}

function refs(value: unknown, sources: Record<string, SourceRecord>, path: string, line: number): string[] {
  if (!Array.isArray(value) || !value.length || value.some(ref => typeof ref !== 'string')) {
    fail(path, line, 'source_refs must be a nonempty array of source IDs');
  }
  for (const ref of value as string[]) {
    if (!sources[ref]) fail(path, line, `unknown source reference ${ref}`);
  }
  return value as string[];
}

function validateSources(sources: Record<string, SourceRecord>): void {
  for (const [id, source] of Object.entries(sources)) {
    if (!source.title || !/^https:\/\//.test(source.url)) {
      throw new Error(`content/sources.json: source ${id} needs a title and HTTPS URL`);
    }
  }
}

/** Compile a collection in memory, allowing synthetic fixtures to use the exact production path. */
export function compileCollection(
  definition: CollectionDefinition,
  ruleSources: RuleSource[],
  sources: Record<string, SourceRecord>,
  contentVersion = 'test',
): CollectionManifest {
  validateSources(sources);
  if (definition.schemaVersion !== '1') throw new Error('collection.json: unsupported schemaVersion');
  for (const key of ['id', 'title', 'description', 'version', 'limitations', 'associationContext'] as const) {
    if (!definition[key]) throw new Error(`collection.json: missing ${key}`);
  }
  if (!Array.isArray(definition.sections) || !definition.sections.length) {
    throw new Error('collection.json: sections must be a nonempty array');
  }
  const sectionIds = definition.sections.map(section => section.id);
  if (new Set(sectionIds).size !== sectionIds.length) throw new Error('collection.json: duplicate section ID');
  if (definition.sections.some(section => !section.id || !section.label)) {
    throw new Error('collection.json: each section needs an ID and label');
  }
  if (!Array.isArray(definition.rules) || !definition.rules.length) {
    throw new Error('collection.json: rules must be a nonempty array');
  }
  if (new Set(definition.rules).size !== definition.rules.length) throw new Error('collection.json: duplicate rule path');
  const byPath = new Map(ruleSources.map(rule => [rule.path, rule]));
  const questions = new Map<string, AtlasQuestion>();
  const firstLocations = new Map<string, string>();
  const executable: CollectionManifest['rules'] = [];
  const ruleIds = new Set<string>();

  for (const relativePath of definition.rules) {
    const source = byPath.get(relativePath);
    if (!source) throw new Error(`collection.json: missing member rule ${relativePath}`);
    const path = source.path;
    const statements = splitStatements(source.text, path);
    const headers = statements.filter(statement => statement.text.startsWith('#define_ruleblock'));
    if (headers.length !== 1 || statements[0] !== headers[0]) fail(path, 1, 'one #define_ruleblock must appear first');
    const header = directive(headers[0], path);
    const basename = relativePath.split('/').pop()?.replace(/\.prb$/, '');
    if (header.name !== basename) fail(path, headers[0].line, 'ruleblock ID must match .prb basename');
    if (ruleIds.has(header.name)) fail(path, headers[0].line, `duplicate ruleblock ID ${header.name}`);
    ruleIds.add(header.name);
    const headerValue = object(header.value, path, headers[0].line, 'ruleblock');
    const headerAtlas = object(headerValue.atlas, path, headers[0].line, 'ruleblock atlas');
    if (headerAtlas.schema_version !== '1') fail(path, headers[0].line, 'unsupported atlas schema_version');
    const disease = {
      ruleId: header.name,
      label: string(headerAtlas.disease_label, path, headers[0].line, 'disease_label'),
      diseaseId: string(headerAtlas.disease_id, path, headers[0].line, 'disease_id'),
      version: string(headerAtlas.version, path, headers[0].line, 'version'),
      sourceRefs: refs(headerAtlas.source_refs, sources, path, headers[0].line),
    };
    const demoThreshold = headerAtlas.demo_threshold;
    if (demoThreshold !== undefined && (!Number.isInteger(demoThreshold) || (demoThreshold as number) < 1)) {
      fail(path, headers[0].line, 'demo_threshold must be a positive integer');
    }
    const demo = demoThreshold === undefined ? undefined : {
      threshold: demoThreshold as number,
      actionWhenFlagged: string(headerAtlas.demo_action_when_flagged, path, headers[0].line,
        'demo_action_when_flagged'),
      actionWhenNotFlagged: string(headerAtlas.demo_action_when_not_flagged, path, headers[0].line,
        'demo_action_when_not_flagged'),
    };
    const metadata = new Map<string, { statement: Statement; data: Record<string, unknown> }>();
    const body: Statement[] = [];
    let sawAttribute = false;
    for (const statement of statements.slice(1)) {
      if (statement.text.startsWith('#')) {
        const entry = directive(statement, path);
        if (entry.kind !== 'define_attribute') fail(path, statement.line, 'unexpected ruleblock directive');
        sawAttribute = true;
        if (metadata.has(entry.name)) fail(path, statement.line, `duplicate metadata for ${entry.name}`);
        metadata.set(entry.name, { statement, data: object(entry.value, path, statement.line, 'attribute') });
      } else {
        if (sawAttribute) fail(path, statement.line, 'executable statements must precede attribute metadata');
        body.push(statement);
      }
    }
    const executableSource = body.map(statement => `${statement.text};`).join('\n');
    let parsed;
    try { parsed = parse([{ name: header.name, text: executableSource, isActive: true }])[0]; }
    catch (error) { fail(path, body[0]?.line ?? 1, `core parser rejected executable rules: ${(error as Error).message}`); }
    if (parsed.rules.length !== body.length) fail(path, 1, 'core parser did not recognise every executable statement');
    executable.push({
      id: header.name,
      source: executableSource,
      ...(demo ? { demo } : {}),
      authoredSource: source.text,
      assetPath: `/generated/ruleblocks/${definition.id}/${header.name}-${contentVersion}.prb`,
      label: disease.label,
      diseaseId: disease.diseaseId,
      version: disease.version,
      sourceRefs: disease.sourceRefs,
    });
    const inputVariables = new Set<string>();
    for (const rule of parsed.rules) {
      if (rule.ruleType !== RuleType.FETCH_STATEMENT) continue;
      const fetch = rule as ParsedFetchStatement;
      if (fetch.table !== 'eadv' || fetch.attributeList.length !== 1 || fetch.property !== 'val' ||
        fetch.functionName !== 'last' || fetch.functionParams?.length || fetch.predicate) {
        fail(path, body.find(statement => statement.text.startsWith(fetch.assignedVariable))?.line ?? 1,
          `input ${fetch.assignedVariable} must fetch one exact eadv attribute with .val.last()`);
      }
      const variable = fetch.assignedVariable;
      if (inputVariables.has(variable)) fail(path, 1, `duplicate input variable ${variable}`);
      inputVariables.add(variable);
      const attribute = fetch.attributeList[0];
      if (!/^phen_[a-z0-9_]+$/.test(attribute)) fail(path, 1, `invalid phenotype attribute ${attribute}`);
      const meta = metadata.get(variable);
      if (!meta) fail(path, 1, `missing #define_attribute for fetched input ${variable}`);
      const atlas = object(meta.data.atlas, path, meta.statement.line, `${variable}.atlas`);
      if (atlas.role !== 'input') fail(path, meta.statement.line, `${variable} must declare atlas.role: "input"`);
      const featureId = string(atlas.feature_id, path, meta.statement.line, 'feature_id');
      const sourceAttribute = string(atlas.source_attribute, path, meta.statement.line, 'source_attribute');
      if (featureId !== variable || sourceAttribute !== attribute || attribute !== `phen_${featureId}`) {
        fail(path, meta.statement.line, `${variable} feature ID, variable and source attribute must agree`);
      }
      const section = string(atlas.section, path, meta.statement.line, 'section');
      if (!sectionIds.includes(section)) fail(path, meta.statement.line, `unknown section ${section}`);
      if (atlas.answer_type !== 'presence') fail(path, meta.statement.line, 'unsupported answer_type');
      const hpoId = string(atlas.hpo_id, path, meta.statement.line, 'hpo_id');
      if (!/^HP:\d{7}$/.test(hpoId)) fail(path, meta.statement.line, 'invalid HPO identifier');
      const question: AtlasQuestion = {
        featureId,
        sourceAttribute,
        label: string(meta.data.label, path, meta.statement.line, 'label'),
        question: string(atlas.question, path, meta.statement.line, 'question'),
        section,
        answerType: 'presence',
        hpoId,
        ...(atlas.help === undefined ? {} : { help: string(atlas.help, path, meta.statement.line, 'help') }),
        sourceRefs: refs(atlas.source_refs ?? disease.sourceRefs, sources, path, meta.statement.line),
        diseases: [{ ...disease, inputLine: meta.statement.line }],
      };
      const existing = questions.get(featureId);
      if (existing) {
        const { diseases: _old, sourceRefs: _oldRefs, ...oldDefinition } = existing;
        const { diseases: _new, sourceRefs: _newRefs, ...newDefinition } = question;
        if (JSON.stringify(oldDefinition) !== JSON.stringify(newDefinition)) {
          fail(path, meta.statement.line,
            `conflicting definition for ${featureId}; first defined at ${firstLocations.get(featureId)}`);
        }
        existing.sourceRefs = [...new Set([...existing.sourceRefs, ...question.sourceRefs])];
        existing.diseases.push(question.diseases[0]);
      } else {
        questions.set(featureId, question);
        firstLocations.set(featureId, `${path}:${meta.statement.line}`);
      }
    }
    for (const [variable, meta] of metadata) {
      if (!inputVariables.has(variable)) fail(path, meta.statement.line, `metadata ${variable} has no fetched input`);
    }
    if (demoThreshold !== undefined) {
      if ((demoThreshold as number) > inputVariables.size) {
        fail(path, headers[0].line, 'demo_threshold exceeds the number of input features');
      }
      const computes = parsed.rules.filter(rule => rule.ruleType === RuleType.COMPUTE_STATEMENT) as ParsedComputeStatement[];
      const byVariable = new Map(computes.map(rule => [rule.assignedVariable, rule]));
      const count = byVariable.get('present_feature_count');
      const prompt = byVariable.get('demo_review_prompt');
      const output = byVariable.get(header.name);
      const expectedCount = [...inputVariables].map(variable => `coalesce(${variable}, 0)`).join(' + ');
      if (computes.length !== 3 || count?.conditions.length !== 1 ||
        count.conditions[0].predicate !== '.' || count.conditions[0].returnValue !== expectedCount ||
        prompt?.conditions.length !== 2 ||
        prompt.conditions[0].predicate !== `present_feature_count >= ${demoThreshold}` ||
        prompt.conditions[0].returnValue !== '1' || prompt.conditions[1].predicate !== undefined ||
        prompt.conditions[1].returnValue !== '0' || output?.conditions.length !== 1 ||
        output.conditions[0].predicate !== '.' || output.conditions[0].returnValue !== 'demo_review_prompt') {
        fail(path, 1, 'illustrative rule must count inputs and emit only the declared review prompt');
      }
    }
  }
  return {
    schemaVersion: '1', id: definition.id, title: definition.title,
    description: definition.description, version: definition.version,
    limitations: string(definition.limitations, 'collection.json', 1, 'limitations'),
    associationContext: string(definition.associationContext, 'collection.json', 1, 'associationContext'),
    contentVersion,
    sections: definition.sections,
    questions: [...questions.values()].sort((a, b) =>
      sectionIds.indexOf(a.section) - sectionIds.indexOf(b.section) || a.label.localeCompare(b.label)),
    rules: executable,
    sources,
  };
}
