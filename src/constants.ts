import { fairy } from '@/app/assets/fairy';
import { fire } from '@/app/assets/fire';
import { grass } from '@/app/assets/grass';
import { ice } from '@/app/assets/ice';
import { lightning } from '@/app/assets/lightning';
import { rock } from '@/app/assets/rock';
import { water } from '@/app/assets/water';
import { objectKeys } from '@/utils/object-keys';

export const config = {
  maxAttempts: 8,
  solutionLength: 4,
  localStorageKey: 'user_id',
} as const;

export const defaultColor = 'gray' as const;
export const gameRow: string[] = new Array(config.solutionLength).fill(
  defaultColor,
);
export const gameRows: string[][] = new Array(config.maxAttempts)
  .fill(defaultColor)
  .map(() => new Array(config.solutionLength).fill(defaultColor));

export const icons = {
  fairy,
  fire,
  lightning,
  grass,
  ice,
  water,
  rock,
} as const;
export const gameTokens = objectKeys(icons).map((icon, id) => ({
  icon,
  color: `var(--token-${id})`,
  id,
}));
export type GameToken = (typeof gameTokens)[number];

const correct = 'X' as const;
const feedbackTokenSet = [
  { value: '-', label: 'incorrect color', color: defaultColor },
  {
    value: correct,
    label: 'correct color, correct position',
    color: '#000000',
  },
  { value: 'O', label: 'correct color, incorrect position', color: '#ffffff' },
] as const;
export const feedbackTokens = feedbackTokenSet.map((token, id) => ({
  ...token,
  id,
}));
export const winningFeedback = new Array(config.solutionLength)
  .fill(correct)
  .join('');
