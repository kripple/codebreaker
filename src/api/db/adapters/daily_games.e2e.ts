import { expect, test } from '@playwright/test';

import {
  getDailyGameById,
  getOrCreateDailyGame,
} from '@/api/db/adapters/daily_games';
import { createNewUser } from '@/api/db/adapters/users';

test.describe('daily_games', () => {
  test('get or create daily game', async () => {
    const user = await createNewUser();
    expect(user).toBeTruthy();

    const game = await getOrCreateDailyGame(user);
    expect(game).toBeTruthy();

    const gameById = await getDailyGameById(game.id);
    expect(gameById).toBeTruthy();

    expect(game).toEqual(gameById);
  });
});
