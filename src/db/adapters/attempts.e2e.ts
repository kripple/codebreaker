import { expect, test } from '@playwright/test';

import { createNewAdhocGame } from '@/db/adapters/adhoc_games';
import { createNewAttempt, getAttempts } from '@/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/db/adapters/daily_games';
import { createNewUser } from '@/db/adapters/users';

test.describe('attempts', () => {
  test.describe('daily game', () => {
    test('get attempts', async () => {
      const user = await createNewUser();
      expect(user).toBeTruthy();

      const game = await getOrCreateDailyGame(user);
      expect(game).toBeTruthy();

      const attempts = await getAttempts(game);
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(0);
    });

    test('make attempt', async () => {
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
    test('get attempts', async () => {
      const user = await createNewUser();
      expect(user).toBeTruthy();

      const game = await createNewAdhocGame(user);
      expect(game).toBeTruthy();

      const attempts = await getAttempts(game);
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(0);
    });

    test('make attempt', async () => {
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

  test('verify attempts are returned in the order they were created', async () => {
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
