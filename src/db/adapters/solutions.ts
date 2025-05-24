import { eq, sql } from 'drizzle-orm';

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

export async function getSolution(): Promise<Solution | undefined> {
  server.log.info('get daily solution');
  const solutions = await server.db
    .select()
    .from(Solution)
    .where(sql`${Solution.date} = CURRENT_DATE`);
  const solution = solutions.pop();
  return solution;
}

export async function getSolutionById(
  id: number,
): Promise<Solution | undefined> {
  server.log.info(`get solution by id '${id}'`);
  const solutions = await server.db
    .select()
    .from(Solution)
    .where(eq(Solution.id, id));
  const solution = solutions.pop();
  return solution;
}

export async function getOrCreateSolution(): Promise<Solution> {
  const currentSolution = await getSolution();
  if (currentSolution) server.log.info(`get solution '${currentSolution.id}'`);

  const solution = currentSolution || (await createNewSolution());
  if (!currentSolution) server.log.info(`create new solution '${solution.id}'`);

  return solution;
}
