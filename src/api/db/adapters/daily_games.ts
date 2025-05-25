import { and, eq } from 'drizzle-orm';

import { server } from '@/api/server';
import { getOrCreateSolution } from '@/api/db/adapters/solutions';
import { DailyGame } from '@/api/db/schema/daily_games';
import type { User } from '@/api/db/schema/users';

async function createNewDailyGame(user: User): Promise<DailyGame> {
  server.log.info('create new daily solution');

  const solution = await getOrCreateSolution();
  const daily_solutions = await server.db
    .insert(DailyGame)
    .values({
      user_id: user.id,
      solution_id: solution.id,
    })
    .returning();
  const daily_solution = daily_solutions.pop();
  if (!daily_solution) {
    throw Error('failed to create new daily solution');
  }
  return daily_solution;
}

async function getDailyGame(user: User): Promise<DailyGame | undefined> {
  server.log.info('get daily solution');
  const solution = await getOrCreateSolution();
  const games = await server.db
    .select()
    .from(DailyGame)
    .where(
      and(
        eq(DailyGame.user_id, user.id),
        eq(DailyGame.solution_id, solution.id),
      ),
    );
  const game = games.pop();
  return game;
}

export async function getDailyGameById(
  id: number,
): Promise<DailyGame | undefined> {
  server.log.info('get daily solution by id');
  const games = await server.db
    .select()
    .from(DailyGame)
    .where(eq(DailyGame.id, id));
  const game = games.pop();
  return game;
}

export async function getOrCreateDailyGame(user: User): Promise<DailyGame> {
  server.log.info('get or create daily game');

  const currentGame = await getDailyGame(user);
  if (currentGame) server.log.info(`get daily game '${currentGame.id}'`);

  const game = currentGame || (await createNewDailyGame(user));
  if (!currentGame) server.log.info(`create new daily game '${game.id}'`);

  return game;
}
