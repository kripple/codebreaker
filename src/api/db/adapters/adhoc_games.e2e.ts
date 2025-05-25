import { expect, test } from '@playwright/test';

import {
  createNewAdhocGame,
  getAdhocGameById,
} from '@/api/db/adapters/adhoc_games';
import { createNewUser } from '@/api/db/adapters/users';

test.describe('adhoc_games', () => {
  test('new adhoc game', async () => {
    const user = await createNewUser();
    expect(user).toBeTruthy();

    const game = await createNewAdhocGame(user);
    expect(game).toBeTruthy();

    const currentGame = await getAdhocGameById(game.id);
    expect(game).toEqual(currentGame);
  });
});
