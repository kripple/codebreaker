import { and, eq } from 'drizzle-orm';

import { getOrCreateSolution } from '@/api/db/adapters/solutions';
import { DailyGame } from '@/api/db/schema/daily_games';
import type { User } from '@/api/db/schema/users';

async function createNewDailyGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<DailyGame> {
  console.info('create new daily solution');

  const solution = await getOrCreateSolution({ db });
  const daily_solutions = await db
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

async function getDailyGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<DailyGame | undefined> {
  console.info('get daily solution');
  const solution = await getOrCreateSolution({ db });
  const games = await db
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

export async function getDailyGameById({
  db,
  id,
}: {
  db: AppDatabase;
  id: number;
}): Promise<DailyGame | undefined> {
  console.info('get daily solution by id');
  const games = await db.select().from(DailyGame).where(eq(DailyGame.id, id));
  const game = games.pop();
  return game;
}

export async function getOrCreateDailyGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<DailyGame> {
  console.info('get or create daily game');

  const currentGame = await getDailyGame({ db, user });
  if (currentGame) console.info(`get daily game '${currentGame.id}'`);

  const game = currentGame || (await createNewDailyGame({ db, user }));
  if (!currentGame) console.info(`create new daily game '${game.id}'`);

  return game;
}
