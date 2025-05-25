import type { Attempt } from '@/db/schema/attempts';
import type { User } from '@/db/schema/users';

export function replyWith({
  user,
  attempts,
}: {
  user: User;
  attempts: Attempt[];
}) {
  return {
    id: user.uuid,
    attempts: (attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback,
    })),
  };
}
export type Data = ReturnType<typeof replyWith>;
export type Route<T, D> = {
  Params: T;
  Reply: { data: D; error?: never } | { data?: never; error: unknown };
};
