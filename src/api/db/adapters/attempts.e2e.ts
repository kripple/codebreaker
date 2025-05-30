import { expect, test } from '@playwright/test';

import { createNewAdhocGame } from '@/api/db/adapters/adhoc_games';
import { createNewAttempt, getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewGenericGame } from '@/api/db/adapters/generic_games';
import { createNewUser } from '@/api/db/adapters/users';
import { getDb } from '@/api/helpers/getDb';

const allowedOrigins = process.env.VITE_APP_URL as string;
const connectionString = process.env.DATABASE_URL as string;
const db = getDb({ allowedOrigins, connectionString });

test.describe('attempts', () => {
  test.describe('daily game', () => {
    test('get attempts', async () => {
      const user = await createNewUser({ db });
      expect(user).toBeTruthy();

      const dailyGame = await getOrCreateDailyGame({ db, user });
      expect(dailyGame).toBeTruthy();

      const game = await createNewGenericGame({ db, game: dailyGame });
      expect(game).toBeTruthy();

      const attempts = await getAttempts({ db, game });
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(0);
    });

    test('make attempt', async () => {
      const user = await createNewUser({ db });
      expect(user).toBeTruthy();

      const dailyGame = await getOrCreateDailyGame({ db, user });
      expect(dailyGame).toBeTruthy();

      const game = await createNewGenericGame({ db, game: dailyGame });
      expect(game).toBeTruthy();

      const attempt = await createNewAttempt({
        db,
        game,
        attempt: 'attempt',
        feedback: 'feedback',
        order: 1,
      });
      expect(attempt).toBeTruthy();

      const attempts = await getAttempts({ db, game });
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(1);
    });

    test('attempts are returned in order', async () => {
      const user = await createNewUser({ db });
      expect(user).toBeTruthy();

      const dailyGame = await getOrCreateDailyGame({ db, user });
      expect(dailyGame).toBeTruthy();

      const game = await createNewGenericGame({ db, game: dailyGame });
      expect(game).toBeTruthy();

      for (let order = 1; order <= 5; order++) {
        const attempt = await createNewAttempt({
          db,
          game,
          attempt: 'attempt',
          feedback: 'feedback',
          order,
        });
        expect(attempt).toBeTruthy();
      }

      const attempts = await getAttempts({ db, game });
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(5);

      const first = attempts.shift()!;
      const last = attempts.pop()!;
      expect(first).toBeTruthy();
      expect(last).toBeTruthy();

      expect(first.game_attempts_order).toEqual(1);
      expect(last.game_attempts_order).toEqual(5);
    });
  });

  test.describe('adhoc game', () => {
    test('get attempts', async () => {
      const user = await createNewUser({ db });
      expect(user).toBeTruthy();

      const adhocGame = await createNewAdhocGame({ db, user });
      expect(adhocGame).toBeTruthy();

      const game = await createNewGenericGame({ db, game: adhocGame });
      expect(game).toBeTruthy();

      const attempts = await getAttempts({ db, game });
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(0);
    });

    test('make attempt', async () => {
      const user = await createNewUser({ db });
      expect(user).toBeTruthy();

      const adhocGame = await createNewAdhocGame({ db, user });
      expect(adhocGame).toBeTruthy();

      const game = await createNewGenericGame({ db, game: adhocGame });
      expect(game).toBeTruthy();

      const attempt = await createNewAttempt({
        db,
        game,
        attempt: 'attempt',
        feedback: 'feedback',
        order: 1,
      });
      expect(attempt).toBeTruthy();

      const attempts = await getAttempts({ db, game });
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(1);
    });

    test('attempts are returned in order', async () => {
      const user = await createNewUser({ db });
      expect(user).toBeTruthy();

      const adhocGame = await createNewAdhocGame({ db, user });
      expect(adhocGame).toBeTruthy();

      const game = await createNewGenericGame({ db, game: adhocGame });
      expect(game).toBeTruthy();

      for (let order = 1; order <= 5; order++) {
        const attempt = await createNewAttempt({
          db,
          game,
          attempt: 'attempt',
          feedback: 'feedback',
          order,
        });
        expect(attempt).toBeTruthy();
      }

      const attempts = await getAttempts({ db, game });
      expect(attempts).toBeTruthy();
      expect(attempts).toHaveLength(5);

      const first = attempts.shift()!;
      const last = attempts.pop()!;
      expect(first).toBeTruthy();
      expect(last).toBeTruthy();

      expect(first.game_attempts_order).toEqual(1);
      expect(last.game_attempts_order).toEqual(5);
    });
  });
});
