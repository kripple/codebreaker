import { expect, test } from '@playwright/test';

import { getOrCreateSolution, getSolutionById } from '@/db/adapters/solutions';

test.describe('solutions', () => {
  test('create new solution', async () => {
    const solution = await getOrCreateSolution();
    expect(solution).toBeTruthy();
    const solutionById = await getSolutionById(solution.id);
    expect(solutionById).toBeTruthy();
    expect(solution).toEqual(solutionById);
  });
});
