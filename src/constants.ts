import { fairy } from '@/app/assets/fairy';
import { fire } from '@/app/assets/fire';
import { grass } from '@/app/assets/grass';
import { ice } from '@/app/assets/ice';
import { lightning } from '@/app/assets/lightning';
import { rock } from '@/app/assets/rock';
import { water } from '@/app/assets/water';
import { lookup } from '@/utils/array-lookup';
import { objectKeys } from '@/utils/object-keys';
import { isString } from '@/utils/type-guards';

export const config = {
  maxAttempts: 8,
  solutionLength: 4,
  profiler: true,
} as const;

export const defaultColor = 'gray' as const;
export const gameRow: string[] = new Array(config.solutionLength).fill(
  defaultColor,
);
const _gameRows: string[][] = new Array(config.maxAttempts)
  .fill(defaultColor)
  .map(() => new Array(config.solutionLength).fill(defaultColor));
export const gameRows = () => [..._gameRows];

export const icons = {
  fairy,
  fire,
  lightning,
  grass,
  ice,
  water,
  rock,
} as const;
export const gameTokens = objectKeys(icons).map((icon, id) => {
  const tokenId = id + 1;
  return {
    icon,
    color: `var(--token-${tokenId})`,
    id: tokenId.toString(),
  };
});
export const gameTokensByColor = lookup(gameTokens, 'color');
export const gameTokensById = lookup(gameTokens, 'id');
export type GameToken = (typeof gameTokens)[number];

const correct = 'X' as const;
const feedbackTokenSet = [
  {
    value: '-',
    label: 'incorrect color',
    key: 'incorrect',
  },
  {
    value: 'O',
    label: 'correct color, incorrect position',
    key: 'halfCorrect',
  },
  {
    value: correct,
    label: 'correct color, correct position',
    key: 'correct',
  },
] as const;
export const feedbackTokens = feedbackTokenSet.map((token, id) => ({
  ...token,
  id,
  color: `var(--feedback-token-${token.key})`,
}));
export const feedbackTokenByValue = lookup(feedbackTokens, 'value');
export type FeedbackToken = (typeof feedbackTokens)[number];
export function isFeedbackToken(
  value?: unknown,
): value is FeedbackToken['value'] {
  if (!value || !isString(value)) return false;
  return value in feedbackTokenByValue;
}

export const winningFeedback = new Array(config.solutionLength)
  .fill(correct)
  .join('');
