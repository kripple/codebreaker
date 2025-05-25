import type { Attempt } from '@/db/schema/attempts';
import type { User } from '@/db/schema/users';
import type { Game } from '@/types/game';

export function getGame({
  user,
  attempts,
}: {
  user: User;
  attempts: Attempt[];
}): Game {
  return {
    id: user.uuid,
    attempts: (attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback,
    })),
  };
}
