export const config = {
  allowedAttempts: 8,
  solutionLength: 4,
} as const;

export const defaultColor = 'gray' as const;
export const gameRow = new Array(config.solutionLength).fill(defaultColor);
export const gameRows = new Array(config.allowedAttempts)
  .fill(defaultColor)
  .map(() => new Array(config.solutionLength).fill(defaultColor));

const numberOfTokenColors = 6 as const;
export const gameTokens = new Array(numberOfTokenColors)
  .fill(0)
  .map((_, id) => ({
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

// https://www.deviantart.com/adeptcharon/art/Pokemon-Types-Sword-and-Shield-930187530
