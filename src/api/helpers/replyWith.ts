import type { Attempt } from '@/db/schema/attempts';
import type { User } from '@/db/schema/users';
// import type { GameData } from '@/types/response';

type GameData = {
  id: string;
  attempts: {
    value: string;
    feedback: string;
  }[];
};

export function replyWith({
  user,
  attempts,
}: {
  user: User;
  attempts: Attempt[];
}): GameData {
  return {
    id: user.uuid,
    attempts: (attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback,
    })),
  };
}

export type Route<T, D> = {
  Params: T;
  Reply: D;
};
