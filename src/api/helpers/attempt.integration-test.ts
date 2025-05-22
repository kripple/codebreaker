import { expect, test } from '@playwright/test';

import { createNewAttempt, getAttempts } from '@/api/helpers/attempt';
import { createNewGame } from '@/api/helpers/game';
import { createNewUser } from '@/api/helpers/user';

// start the database and server before running these tests

test('get attempts', async () => {
  const user = await createNewUser();
  expect(user).toBeTruthy();

  const game = await createNewGame(user);
  expect(game).toBeTruthy();

  const attempts = await getAttempts(game);
  expect(attempts).toBeTruthy();
  expect(attempts).toHaveLength(0);
});

test('make attempt', async () => {
  const user = await createNewUser();
  expect(user).toBeTruthy();

  const game = await createNewGame(user);
  expect(game).toBeTruthy();

  const attempt = await createNewAttempt({
    game,
    attempt: 'attempt',
    feedback: 'feedback',
  });
  expect(attempt).toBeTruthy();
});

// FIXME: add test case
test.skip('verify attempts are returned in order', async () => {});
