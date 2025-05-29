import { eq, sql } from 'drizzle-orm';

import { Solution } from '@/api/db/schema/solutions';
import { makeSecretCode } from '@/api/helpers/codemaker';

async function createNewSolution({
  db,
}: {
  db: AppDatabase;
}): Promise<Solution> {
  console.info('create new solution');
  const value = makeSecretCode();
  const solutions = await db
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

export async function getSolution({
  db,
}: {
  db: AppDatabase;
}): Promise<Solution | undefined> {
  console.info('get daily solution');
  const solutions = await db
    .select()
    .from(Solution)
    .where(sql`${Solution.date} = CURRENT_DATE`);
  const solution = solutions.pop();
  return solution;
}

export async function getSolutionById({
  db,
  id,
}: {
  db: AppDatabase;
  id: number;
}): Promise<Solution | undefined> {
  console.info(`get solution by id '${id}'`);
  const solutions = await db.select().from(Solution).where(eq(Solution.id, id));
  const solution = solutions.pop();
  return solution;
}

export async function getOrCreateSolution({
  db,
}: {
  db: AppDatabase;
}): Promise<Solution> {
  const currentSolution = await getSolution({ db });
  if (currentSolution) console.info(`get solution '${currentSolution.id}'`);

  const solution = currentSolution || (await createNewSolution({ db }));
  if (!currentSolution) console.info(`create new solution '${solution.id}'`);

  return solution;
}
