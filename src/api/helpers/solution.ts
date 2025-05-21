import { desc, sql } from 'drizzle-orm';

import { makeSecretCode } from '@/api/helpers/codemaker';
import { server } from '@/api/helpers/server';
import { Solution } from '@/db/schema/solution';

async function createNewSolution(): Promise<Solution> {
  server.log.info('create new solution');
  const value = makeSecretCode();
  const solutions = await server.db
    .insert(Solution)
    .values({
      value,
    })
    .returning();
  const solution = solutions.pop();
  if (!solution) {
    throw Error('failed to create new solution');
  }
  return solution;
}

async function getSolution(): Promise<Solution | undefined> {
  const solutions = await server.db
    .select()
    .from(Solution)
    .where(sql`${Solution.creation_date} = CURRENT_DATE`)
    .orderBy(desc(Solution.created_at))
    .limit(1);
  const solution = solutions.pop();
  return solution;
}

export async function getSolutionById(
  id: number,
): Promise<Solution | undefined> {
  const solutions = await server.db
    .select()
    .from(Solution)
    .where(sql`${Solution.id} = ${id}`);
  const solution = solutions.pop();
  return solution;
}

export async function getOrCreateSolution(): Promise<Solution> {
  const dailyChallenge = await getSolution();
  if (dailyChallenge)
    server.log.info(`get daily challenge '${dailyChallenge.id}'`);

  const solution = dailyChallenge || (await createNewSolution());
  if (!dailyChallenge) server.log.info(`create new solution '${solution.id}'`);

  return solution;
}
