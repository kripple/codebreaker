import { expect, test } from '@playwright/test';

import {
  createNewAdhocGame,
  getAdhocGameById,
} from '@/api/db/adapters/adhoc_games';
import {
  getDailyGameById,
  getOrCreateDailyGame,
} from '@/api/db/adapters/daily_games';
import {
  createNewGenericGame,
  getGenericGame,
} from '@/api/db/adapters/generic_games';
import { createNewUser } from '@/api/db/adapters/users';
import { getDb } from '@/api/helpers/getDb';

const allowedOrigins = process.env.VITE_APP_URL as string;
const connectionString = process.env.VITE_DATABASE_URL as string;
const db = getDb({ allowedOrigins, connectionString });

test.describe('generic_games', () => {
  test('generic daily game', async () => {
    const user = await createNewUser({ db });
    expect(user).toBeTruthy();

    const game = await getOrCreateDailyGame({ db, user });
    expect(game).toBeTruthy();

    const genericGame = await createNewGenericGame({ db, game });
    expect(genericGame).toBeTruthy();
    expect(genericGame.daily_game_id).toEqual(game.id);
    expect(genericGame.adhoc_game_id).toBeNull();

    const currentGame = await getGenericGame({ db, game });
    expect(currentGame).toBeTruthy();
    expect(genericGame.id).toEqual(currentGame!.id);
  });

  test('generic adhoc game', async () => {
    const user = await createNewUser({ db });
    expect(user).toBeTruthy();

    const game = await createNewAdhocGame({ db, user });
    expect(game).toBeTruthy();

    const genericGame = await createNewGenericGame({ db, game });
    expect(genericGame).toBeTruthy();
    expect(genericGame.adhoc_game_id).toEqual(game.id);
    expect(genericGame.daily_game_id).toBeNull();

    const currentGame = await getGenericGame({ db, game });
    expect(currentGame).toBeTruthy();
    expect(genericGame.id).toEqual(currentGame!.id);
  });
});
