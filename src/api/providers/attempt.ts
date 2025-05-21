import { asc, sql } from 'drizzle-orm';

import { updateGame } from '@/api/providers/game';
import { server } from '@/api/providers/server';
import { winningFeedback } from '@/constants';
import { Attempt } from '@/db/schema/attempt';
import { Game, type GameData } from '@/db/schema/game';

export async function createNewAttempt({
  game,
  attempt: value,
  feedback,
}: {
  game: GameData;
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
  // did we win?
  if (attempt.feedback === winningFeedback) {
    // we win! update game record before proceeding
    await updateGame({ id: game.id, win: true });
  } else {
    // was this our last chance?
    if (game.attempts.length + 1 === game.max_attempts) {
      // it *was* our last chance. update game record before proceeding
      await updateGame({ id: game.id, win: false });
    }
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
