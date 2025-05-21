import type { Attempt } from '@/db/schema/attempt';
import type { Game } from '@/db/schema/game';
import type { Solution } from '@/db/schema/solution';
import type { User } from '@/db/schema/user';

export type ResponseData = {
  id: string;
  maxAttempts: number;
  solutionLength: number;
  attempts: {
    value: string;
    feedback: string;
  }[];
};



export function replyWith({
  user,
  game,
  solution,
  attempts,
}: {
  user: User;
  game: Game;
  solution: Solution;
  attempts: Attempt[];
}): ResponseData {
  return {
    id: user.uuid,
    maxAttempts: game.max_attempts,
    solutionLength: solution.length,
    // TODO: make sure these are in the correct order
    attempts: (attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback,
    })),
  };
}
