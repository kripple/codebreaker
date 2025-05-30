import { expect, test } from '@playwright/test';

import {
  createNewAdhocGame,
  getAdhocGameById,
} from '@/api/db/adapters/adhoc_games';
import { createNewUser } from '@/api/db/adapters/users';
import { getDb } from '@/api/helpers/getDb';

const allowedOrigins = process.env.VITE_APP_URL as string;
const connectionString = process.env.DATABASE_URL as string;
const db = getDb({ allowedOrigins, connectionString });

test.describe('adhoc_games', () => {
  test('new adhoc game', async () => {
    const user = await createNewUser({ db });
    expect(user).toBeTruthy();

    const game = await createNewAdhocGame({ db, user });
    expect(game).toBeTruthy();

    const currentGame = await getAdhocGameById({ db, id: game.id });
    expect(game).toEqual(currentGame);
  });
});
