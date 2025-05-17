import fairy from '@/app/assets/fairy.svg';
import fire from '@/app/assets/fire.svg';
import grass from '@/app/assets/grass.svg';
import lightning from '@/app/assets/lightning.svg';
import rock from '@/app/assets/rock.svg';
import water from '@/app/assets/water.svg';

export const config = {
  allowedAttempts: 8,
  solutionLength: 4,
} as const;

export const defaultColor = 'gray' as const;
export const gameRow = new Array(config.solutionLength).fill(defaultColor);
export const gameRows = new Array(config.allowedAttempts)
  .fill(defaultColor)
  .map(() => new Array(config.solutionLength).fill(defaultColor));

export type GameToken = {
  color: string;
  id: number;
  icon: string;
};

export const gameTokens: GameToken[] = [
  { icon: fairy },
  { icon: fire },
  { icon: lightning },
  { icon: grass },
  { icon: water },
  { icon: rock },
].map((token, id) => ({
  ...token,
  color: `var(--token-${id})`,
  id,
}));

const feedbackTokenSet = [
  { value: '-', label: 'empty', color: defaultColor },
  { value: 'X', label: 'black', color: '#000000' },
  { value: 'O', label: 'white', color: '#ffffff' },
] as const;
export const feedbackTokens = feedbackTokenSet.map((token, id) => ({
  ...token,
  id,
}));
