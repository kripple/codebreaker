import { asc, sql } from 'drizzle-orm';

import { server } from '@/api/server';
import { Attempt } from '@/db/schema/attempts';
import { DailyGame } from '@/db/schema/daily_games';

export async function createNewAttempt({
  game,
  attempt: value,
  feedback,
}: {
  game: DailyGame;
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

export async function getAttempts(game: DailyGame): Promise<Attempt[]> {
  const attempts = await server.db
    .select()
    .from(Attempt)
    .where(sql`${Attempt.game_id} = ${game.id}`)
    .orderBy(asc(Attempt.created_at));
  return attempts;
}
