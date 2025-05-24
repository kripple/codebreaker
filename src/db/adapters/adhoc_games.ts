// import { desc, eq, sql } from 'drizzle-orm';

// import { server } from '@/api/server';
// import { getAttempts } from '@/db/adapters/attempts';
// import { getOrCreateSolution, getSolutionById } from '@/db/adapters/solutions';
// import type { Attempt } from '@/db/schema/attempts';
// import { DailyGame } from '@/db/schema/daily_games';
// import { Solution } from '@/db/schema/solutions';
// import type { User } from '@/db/schema/users';

// export async function createNewGame(user: User): Promise<DailyGame> {
//   server.log.info(`create new game for user '${user.id}'`);

//   const solution = await getOrCreateSolution();
//   const games = await server.db
//     .insert(DailyGame)
//     .values({ user_id: user.id, solution_id: solution.id })
//     .returning();
//   const game = games.pop();
//   if (!game) {
//     throw Error('failed to create new game');
//   }
//   return game;
// }

// export async function getGame(user: User): Promise<DailyGame | undefined> {
//   const games = await server.db
//     .select()
//     .from(DailyGame)
//     .where(sql`${DailyGame.user_id} = ${user.id}`)
//     .orderBy(desc(DailyGame.created_at))
//     .limit(1);
//   const game = games.pop();
//   return game;
// }

// export async function getGameById(id: number): Promise<DailyGame> {
//   const games = await server.db
//     .select()
//     .from(DailyGame)
//     .where(sql`${DailyGame.id} = ${id}`);
//   const game = games.pop();
//   if (!game) throw Error('failed to find game by id');
//   return game;
// }

// export async function getOrCreateGame(user: User): Promise<DailyGame> {
//   const currentGame = await getGame(user);
//   if (currentGame) server.log.info(`get game by id '${currentGame.id}'`);

//   const game = currentGame || (await createNewGame(user));
//   if (!currentGame) server.log.info(`create new game '${game.id}'`);

//   return game;
// }

// export async function updateGame({
//   id,
//   win,
// }: {
//   id: number;
//   win: boolean;
// }): Promise<void> {
//   await server.db.update(DailyGame).set({ win }).where(eq(DailyGame.id, id));
// }

// export async function getGameData(
//   game: DailyGame,
// ): Promise<{ solution: Solution; attempts: Attempt[] }> {
//   const solution = await getSolutionById(game.solution_id);
//   if (!solution) throw Error('missing solution');

//   const attempts = await getAttempts(game);
//   return { solution, attempts };
// }
