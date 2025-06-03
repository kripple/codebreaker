import type { Attempt } from '@/api/db/schema/attempts';
import type { User } from '@/api/db/schema/users';
import type { Game } from '@/types/game';
import { toDatetime } from '@/utils/time';

export function getGame({
  user,
  attempts,
  date,
}: {
  user: User;
  attempts: Attempt[];
  date: string;
}): Game & { date: string } {
  return {
    id: user.uuid,
    attempts: (attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback,
    })),
    date: toDatetime(date),
  };
}
