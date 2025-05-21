import { desc, eq, sql } from 'drizzle-orm';

import { getAttempts } from '@/api/helpers/attempt';
import { server } from '@/api/helpers/server';
import { getOrCreateSolution, getSolutionById } from '@/api/helpers/solution';
import type { Attempt } from '@/db/schema/attempt';
import { Game } from '@/db/schema/game';
import { Solution } from '@/db/schema/solution';
import type { User } from '@/db/schema/user';

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
    .where(sql`${Game.user_id} = ${user.id}`)
    .orderBy(desc(Game.created_at))
    .limit(1);
  const game = games.pop();
  return game;
}

export async function getGameById(id: number): Promise<Game> {
  const games = await server.db
    .select()
    .from(Game)
    .where(sql`${Game.id} = ${id}`);
  const game = games.pop();
  if (!game) throw Error('failed to find game by id');
  return game;
}

export async function getOrCreateGame(user: User): Promise<Game> {
  const currentGame = await getGame(user);
  if (currentGame) server.log.info(`get game by id '${currentGame.id}'`);

  const game = currentGame || (await createNewGame(user));
  if (!currentGame) server.log.info(`create new game '${game.id}'`);

  return game;
}

export async function updateGame({
  id,
  win,
}: {
  id: number;
  win: boolean;
}): Promise<void> {
  await server.db.update(Game).set({ win }).where(eq(Game.id, id));
}

export async function getGameData(
  game: Game,
): Promise<{ solution: Solution; attempts: Attempt[] }> {
  const solution = await getSolutionById(game.solution_id);
  if (!solution) throw Error('missing solution');

  const attempts = await getAttempts(game);
  return { solution, attempts };
}
