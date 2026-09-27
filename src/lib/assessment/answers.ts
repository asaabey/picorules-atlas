import type { AnswerState, Answers, CollectionManifest } from '../types';

const STATES: readonly AnswerState[] = ['present', 'absent'];

export function createAnswers(manifest: CollectionManifest): Answers {
  return Object.fromEntries(manifest.questions.map(({ featureId }) => [featureId, 'absent']));
}

export function resetAnswers(manifest: CollectionManifest): Answers {
  return createAnswers(manifest);
}

export function setAnswer(
  manifest: CollectionManifest,
  answers: Answers,
  featureId: string,
  state: AnswerState,
): Answers {
  if (!manifest.questions.some((question) => question.featureId === featureId)) {
    throw new Error(`Feature ${featureId} is not in collection ${manifest.id}`);
  }
  if (!STATES.includes(state)) {
    throw new Error(`Unsupported answer state for ${featureId}: ${String(state)}`);
  }
  return { ...answers, [featureId]: state };
}

export function countPresent(manifest: CollectionManifest, answers: Answers): number {
  return manifest.questions.filter(({ featureId }) => {
    const state = answers[featureId] ?? 'absent';
    if (!STATES.includes(state)) {
      throw new Error(`Unsupported answer state for ${featureId}: ${String(state)}`);
    }
    return state === 'present';
  }).length;
}

export function assertAnswers(manifest: CollectionManifest, answers: Answers): void {
  const known = new Set(manifest.questions.map((question) => question.featureId));
  for (const [featureId, state] of Object.entries(answers)) {
    if (!known.has(featureId)) {
      throw new Error(`Feature ${featureId} is not in collection ${manifest.id}`);
    }
    if (!STATES.includes(state)) {
      throw new Error(`Unsupported answer state for ${featureId}: ${String(state)}`);
    }
  }
}
