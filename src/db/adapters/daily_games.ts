import { desc, sql } from 'drizzle-orm';

import { server } from '@/api/server';
// import { createNewSolution } from '@/db/adapters/solutions';
import { DailyGame } from '@/db/schema/daily_games';
import { Solution } from '@/db/schema/solutions';

// async function createNewDailySolution(): Promise<DailyGame> {
//   server.log.info('create new daily solution');

//   const solution = await createNewSolution();
//   const daily_solutions = await server.db
//     .insert(Solution)
//     .values({
//       solution_id: solution.id,
//     })
//     .returning();
//   const daily_solution = daily_solutions.pop();
//   if (!daily_solution) {
//     throw Error('failed to create new daily solution');
//   }
//   return daily_solution;
// }

// async function getDailySolution(): Promise<DailyGame | undefined> {
//   const daily_solutions = await server.db
//     .select()
//     .from(DailyGame)
//     .where(sql`${DailyGame.date} = CURRENT_DATE`)
//     .orderBy(desc(DailyGame.created_at))
//     .limit(1);
//   const daily_solution = daily_solutions.pop();
//   return daily_solution;
// }

// export async function getDailySolutionById(
//   id: number,
// ): Promise<DailyGame | undefined> {
//   const daily_solutions = await server.db
//     .select()
//     .from(DailyGame)
//     .where(sql`${DailyGame.id} = ${id}`);
//   const daily_solution = daily_solutions.pop();
//   return daily_solution;
// }

// export async function getOrCreateDailySolution(): Promise<DailyGame> {
//   const currentSolution = await getDailySolution();
//   if (currentSolution)
//     server.log.info(`get daily challenge '${currentSolution.id}'`);

//   const solution = currentSolution || (await createNewDailySolution());
//   if (!currentSolution)
//     server.log.info(`create new daily solution '${solution.id}'`);

//   return solution;
// }
