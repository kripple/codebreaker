import { expect, test } from '@playwright/test';

import {
  getOrCreateSolution,
  getSolution,
  getSolutionById,
} from '@/db/adapters/solutions';

test.describe('solutions', () => {
  // TODO: we need a clean db for this test
  test.skip('get solution', async () => {
    const currentSolution = await getSolution();
    expect(currentSolution).toBeUndefined();

    const solution = await getOrCreateSolution();
    expect(solution).toBeTruthy();

    const alsoSolution = await getSolution();
    expect(alsoSolution).toBeTruthy();
    expect(solution).toEqual(alsoSolution);

    const solutionById = await getSolutionById(solution.id);
    expect(solutionById).toBeTruthy();
    expect(solution).toEqual(solutionById);
  });
});
