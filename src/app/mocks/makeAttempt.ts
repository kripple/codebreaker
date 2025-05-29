import { getGameById } from '@/app/mocks/getGameById';

export const makeAttempt = ({ id, code }: { id: string; code: string }) => {
  const game = getGameById(id);
  return {
    ...game,
    attempts: [
      ...game.attempts,
      {
        value: code,
        feedback: 'XO--',
      },
    ],
  };
};
