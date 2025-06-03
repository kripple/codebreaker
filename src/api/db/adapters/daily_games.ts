import { and, eq } from 'drizzle-orm';

import {
  getOrCreateSolution,
  getSolutionById,
} from '@/api/db/adapters/solutions';
import { DailyGame } from '@/api/db/schema/daily_games';
import type { Solution } from '@/api/db/schema/solutions';
import type { User } from '@/api/db/schema/users';

async function createNewDailyGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<{
  game: DailyGame;
  date: Solution['date'];
}> {
  console.info('create new daily game');

  const solution = await getOrCreateSolution({ db });
  const games = await db
    .insert(DailyGame)
    .values({
      user_id: user.id,
      solution_id: solution.id,
    })
    .returning();
  const game = games.pop();
  if (!game) {
    throw Error('failed to create new daily game');
  }
  return { game, date: solution.date };
}

async function getDailyGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<{
  game?: DailyGame;
  date: Solution['date'];
}> {
  console.info('get daily game');
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
  return { game, date: solution.date };
}

export async function getDailyGameById({
  db,
  id,
}: {
  db: AppDatabase;
  id: number;
}): Promise<{
  game?: DailyGame;
  date?: Solution['date'];
}> {
  console.info('get daily game by id');
  const games = await db.select().from(DailyGame).where(eq(DailyGame.id, id));
  const game = games.pop();
  if (!game) return { game };

  const solution = await getSolutionById({ db, id: game.solution_id });
  if (!solution) throw Error('game is invalid');

  return { game, date: solution.date };
}

export async function getOrCreateDailyGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<{
  game: DailyGame;
  date: Solution['date'];
}> {
  console.info('get or create daily game');

  const { game: currentGame, date } = await getDailyGame({ db, user });
  if (currentGame) console.info(`get daily game '${currentGame.id}'`);

  const game = currentGame || (await createNewDailyGame({ db, user })).game;
  if (!currentGame) console.info(`create new daily game '${game.id}'`);

  return { game, date };
}
