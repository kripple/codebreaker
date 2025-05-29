import { expect, test } from '@playwright/test';

import { createNewAdhocGame } from '@/api/db/adapters/adhoc_games';
import { createNewAttempt, getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewUser } from '@/api/db/adapters/users';

// TODO: convert to unit test by injecting mock db instance

test.describe('attempts', () => {
  test.describe('daily game', () => {
    test.skip('get attempts', async () => {
      const user = await createNewUser();
      expect(user).toBeTruthy();

      const game = await getOrCreateDailyGame(user);
      expect(game).toBeTruthy();

      const attempts = await getAttempts(game);
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(0);
    });

    test.skip('make attempt', async () => {
      const user = await createNewUser();
      expect(user).toBeTruthy();

      const game = await getOrCreateDailyGame(user);
      expect(game).toBeTruthy();

      const attempt = await createNewAttempt({
        game,
        attempt: 'attempt',
        feedback: 'feedback',
      });
      expect(attempt).toBeTruthy();

      const attempts = await getAttempts(game);
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(1);
    });
  });

  test.describe('adhoc game', () => {
    test.skip('get attempts', async () => {
      const user = await createNewUser();
      expect(user).toBeTruthy();

      const game = await createNewAdhocGame(user);
      expect(game).toBeTruthy();

      const attempts = await getAttempts(game);
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(0);
    });

    test.skip('make attempt', async () => {
      const user = await createNewUser();
      expect(user).toBeTruthy();

      const game = await createNewAdhocGame(user);
      expect(game).toBeTruthy();

      const attempt = await createNewAttempt({
        game,
        attempt: 'attempt',
        feedback: 'feedback',
      });
      expect(attempt).toBeTruthy();

      const attempts = await getAttempts(game);
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(1);
    });
  });

  test.skip('verify attempts are returned in the order they were created', async () => {
    const user = await createNewUser();
    expect(user).toBeTruthy();

    const game = await createNewAdhocGame(user);
    expect(game).toBeTruthy();

    for (let i = 0; i < 5; i++) {
      const attempt = await createNewAttempt({
        game,
        attempt: 'attempt',
        feedback: 'feedback',
      });
      expect(attempt).toBeTruthy();
    }

    const attempts = await getAttempts(game);
    expect(attempts).toBeTruthy();
    expect(attempts).toHaveLength(5);

    const first = attempts.shift()!.created_at.toISOString();
    const last = attempts.pop()!.created_at.toISOString();
    expect(first < last).toBe(true);
  });
});
