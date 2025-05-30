import { asc, eq } from 'drizzle-orm';

import { Attempt } from '@/api/db/schema/attempts';
import type { GenericGame } from '@/api/db/schema/generic_games';

export async function createNewAttempt({
  db,
  game,
  attempt: value,
  feedback,
  order,
}: {
  db: AppDatabase;
  game: GenericGame;
  attempt: string;
  feedback: string;
  order: number;
}): Promise<Attempt> {
  console.info('create new attempt');
  const attempts = await db
    .insert(Attempt)
    .values({
      game_id: game.id,
      game_attempts_order: order,
      value,
      feedback,
    })
    .returning();
  const attempt = attempts.pop();
  if (!attempt) {
    throw Error('failed to create new attempt');
  }
  return attempt;
}

export async function getAttempts({
  db,
  game,
}: {
  db: AppDatabase;
  game: GenericGame;
}): Promise<Attempt[]> {
  console.info('get attempts');
  const attempts = await db
    .select()
    .from(Attempt)
    .where(eq(Attempt.game_id, game.id))
    .orderBy(asc(Attempt.game_attempts_order));
  return attempts;
}
