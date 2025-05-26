import { asc, eq } from 'drizzle-orm';
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';

import type { AdhocGame } from '@/api/db/schema/adhoc_games';
import { Attempt } from '@/api/db/schema/attempts';
import type { DailyGame } from '@/api/db/schema/daily_games';

type Props<T extends DailyGame | AdhocGame> = {
  db: PgDatabase<PgQueryResultHKT>;
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
  db,
  game,
  attempt: value,
  feedback,
}: Props<DailyGame | AdhocGame>): Promise<Attempt> {
  console.info('create new attempt');
  const isDailyGame = 'solution_id' in game;
  const attempts = await db
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

export function getAttempts(props: {
  db: PgDatabase<PgQueryResultHKT>;
  game: DailyGame;
}): Promise<Attempt[]>;
export function getAttempts(props: {
  db: PgDatabase<PgQueryResultHKT>;
  game: AdhocGame;
}): Promise<Attempt[]>;
export async function getAttempts({
  db,
  game,
}: {
  db: PgDatabase<PgQueryResultHKT>;
  game: DailyGame | AdhocGame;
}): Promise<Attempt[]> {
  console.info('get attempts');
  const isDailyGame = 'solution_id' in game;
  const attempts = await db
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
