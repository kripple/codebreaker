import { and, desc, sql } from 'drizzle-orm';

import { server } from '@/api/providers/server';
import { getOrCreateSolution } from '@/api/providers/solution';
import { Game } from '@/db/schema/game';
import { User } from '@/db/schema/user';

export async function createNewGame(user: User): Promise<Game> {
  server.log.info(`create new game for user '${user.id}'`);

  const solution = await getOrCreateSolution();
  const games = await server.db
    .insert(Game)
    .values({ user_id: user.id, solution_id: solution.id })
    .returning();
  const game = games.pop();
  if (!game) {
    throw Error('failed to create new game');
  }
  return game;
}

export async function getGame(user: User): Promise<Game | undefined> {
  const games = await server.db
    .select()
    .from(Game)
    .where(and(sql`${Game.user_id} = ${user.id}`, sql`${Game.win} = null`))
    .orderBy(desc(Game.created_at))
    .limit(1);
  const game = games.pop();
  return game;
}

export async function getOrCreateGame(user: User) {
  const currentGame = await getGame(user);
  if (currentGame) server.log.info(`get game by id '${currentGame.id}'`);

  const game = currentGame || (await createNewGame(user));
  if (!currentGame) server.log.info(`create new game '${game.id}'`);

  return {
    id: user.uuid,
    max_attempts: game.max_attempts,
    win: game.win,
  };
}
