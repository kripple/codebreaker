import { asc, eq } from 'drizzle-orm';

import { server } from '@/api/server';
import type { AdhocGame } from '@/db/schema/adhoc_games';
import { Attempt } from '@/db/schema/attempts';
import type { DailyGame } from '@/db/schema/daily_games';

type Props<T extends DailyGame | AdhocGame> = {
  game: T;
  attempt: string;
  feedback: string;
};

export async function createNewAttempt(
  props: Props<DailyGame>,
): Promise<Attempt>;
export async function createNewAttempt(
  props: Props<AdhocGame>,
): Promise<Attempt>;
export async function createNewAttempt({
  game,
  attempt: value,
  feedback,
}: Props<DailyGame | AdhocGame>): Promise<Attempt> {
  server.log.info('create new attempt');
  const isDailyGame = 'solution_id' in game;
  const attempts = await server.db
    .insert(Attempt)
    .values({
      [isDailyGame ? 'daily_game_id' : 'adhoc_game_id']: game.id,
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

export function getAttempts(game: DailyGame): Promise<Attempt[]>;
export function getAttempts(game: AdhocGame): Promise<Attempt[]>;
export async function getAttempts(
  game: DailyGame | AdhocGame,
): Promise<Attempt[]> {
  server.log.info('get attempts');
  const isDailyGame = 'solution_id' in game;
  const attempts = await server.db
    .select()
    .from(Attempt)
    .where(
      isDailyGame
        ? eq(Attempt.daily_game_id, game.id)
        : eq(Attempt.adhoc_game_id, game.id),
    )
    .orderBy(asc(Attempt.created_at));
  return attempts;
}
