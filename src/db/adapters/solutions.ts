import { sql } from 'drizzle-orm';

import { makeSecretCode } from '@/api/helpers/codemaker';
import { server } from '@/api/server';
import { Solution } from '@/db/schema/solutions';

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
  const currentSolution = await createNewSolution();
  if (currentSolution)
    server.log.info(`get daily challenge '${currentSolution.id}'`);

  const solution = currentSolution || (await createNewSolution());
  if (!currentSolution)
    server.log.info(`create new daily solution '${solution.id}'`);

  return solution;
}
