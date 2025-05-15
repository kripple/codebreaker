export const gameTokens = [
  // { id: 0, key: '0', label: '-', color: 'gray' },
  { id: 1, key: '1', label: 'red', color: '#ff0000' },
  { id: 2, key: '2', label: 'orange', color: 'orange' },
  { id: 3, key: '3', label: 'yellow', color: 'yellow' },
  { id: 4, key: '4', label: 'green', color: 'green' },
  { id: 5, key: '5', label: 'blue', color: 'blue' },
  { id: 6, key: '6', label: 'purple', color: 'purple' },
] as const;
type GameToken = (typeof gameTokens)[number];
type GameTokenId = GameToken['key'];
export type { GameTokenId as GameToken };

export const feedbackTokens = [
  { id: 0, key: '-', label: 'empty' },
  { id: 1, key: 'X', label: 'black', color: '#000000' },
  { id: 2, key: 'O', label: 'white', color: 'white' },
] as const;
type FeedbackToken = (typeof feedbackTokens)[number];
type FeedbackTokenId = FeedbackToken['key'];
export type { FeedbackTokenId as FeedbackToken };
