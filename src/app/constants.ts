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
export const gameRow = new Array(config.solutionLength).fill(defaultColor);
export const gameRows = new Array(config.maxAttempts)
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

const feedbackTokenSet = [
  { value: '-', label: 'empty', color: defaultColor },
  { value: 'X', label: 'black', color: '#000000' },
  { value: 'O', label: 'white', color: '#ffffff' },
] as const;
export const feedbackTokens = feedbackTokenSet.map((token, id) => ({
  ...token,
  id,
}));
