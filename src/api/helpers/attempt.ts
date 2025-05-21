import { asc, sql } from 'drizzle-orm';

import { server } from '@/api/helpers/server';
import { Attempt } from '@/db/schema/attempt';
import { Game } from '@/db/schema/game';

export async function createNewAttempt({
  game,
  attempt: value,
  feedback,
}: {
  game: Game;
  attempt: string;
  feedback: string;
}): Promise<Attempt> {
  server.log.info('create new attempt');
  const attempts = await server.db
    .insert(Attempt)
    .values({ game_id: game.id, value, feedback })
    .returning();
  const attempt = attempts.pop();
  if (!attempt) {
    throw Error('failed to create new attempt');
  }
  return attempt;
}

export async function getAttempts(game: Game): Promise<Attempt[]> {
  const attempts = await server.db
    .select()
    .from(Attempt)
    .where(sql`${Attempt.game_id} = ${game.id}`)
    .orderBy(asc(Attempt.created_at));
  return attempts;
}
