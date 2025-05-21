import { expect, test } from '@playwright/test';

import { getOrCreateSolution, getSolutionById } from '@/api/helpers/solution';

// start the database and server before running these tests

test('solution', async () => {
  const solution = await getOrCreateSolution();
  expect(solution).toBeTruthy();

  const solutionById = await getSolutionById(solution.id);
  expect(solutionById).toBeTruthy();

  expect(solution).toEqual(solutionById);
});
