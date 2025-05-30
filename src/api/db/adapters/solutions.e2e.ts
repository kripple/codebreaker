import { expect, test } from '@playwright/test';

import {
  getOrCreateSolution,
  getSolution,
  getSolutionById,
} from '@/api/db/adapters/solutions';
import { getDb } from '@/api/helpers/getDb';

const allowedOrigins = process.env.VITE_APP_URL as string;
const connectionString = process.env.VITE_DATABASE_URL as string;
const db = getDb({ allowedOrigins, connectionString });

test.describe('solutions', () => {
  test('get or create solution', async () => {
    const solution = await getOrCreateSolution({ db });
    expect(solution).toBeTruthy();

    const solutionById = await getSolutionById({ db, id: solution.id });
    expect(solutionById).toBeTruthy();
    expect(solution).toEqual(solutionById);
  });

  // TODO: we need a clean db for this test
  test.skip('get solution', async () => {
    const currentSolution = await getSolution({ db });
    expect(currentSolution).toBeUndefined();

    const solution = await getOrCreateSolution({ db });
    expect(solution).toBeTruthy();

    const alsoSolution = await getSolution({ db });
    expect(alsoSolution).toBeTruthy();
    expect(solution).toEqual(alsoSolution);

    const solutionById = await getSolutionById({ db, id: solution.id });
    expect(solutionById).toBeTruthy();
    expect(solution).toEqual(solutionById);
  });
});
