import { expect, test } from '@playwright/test';

import {
  getDailyGameById,
  getOrCreateDailyGame,
} from '@/api/db/adapters/daily_games';
import { createNewUser } from '@/api/db/adapters/users';
import { getDb } from '@/api/helpers/getDb';

const allowedOrigins = process.env.VITE_APP_URL as string;
const connectionString = process.env.DATABASE_URL as string;
const db = getDb({ allowedOrigins, connectionString });

test.describe('daily_games', () => {
  test('get or create daily game', async () => {
    const user = await createNewUser({ db });
    expect(user).toBeTruthy();

    const game = await getOrCreateDailyGame({ db, user });
    expect(game).toBeTruthy();

    const gameById = await getDailyGameById({ db, id: game.id });
    expect(gameById).toBeTruthy();

    expect(game).toEqual(gameById);
  });
});
