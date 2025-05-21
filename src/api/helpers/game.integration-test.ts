import { expect, test } from '@playwright/test';

import {
  createNewGame,
  getGame,
  getGameById,
  getOrCreateGame,
  updateGame,
} from '@/api/helpers/game';
import { createNewUser } from '@/api/helpers/user';

// start the database and server before running these tests

test('new game', async () => {
  const user = await createNewUser();
  expect(user).toBeTruthy();

  const game = await createNewGame(user);
  expect(game).toBeTruthy();
});

test('automatic new game', async () => {
  const user = await createNewUser();
  expect(user).toBeTruthy();

  const game = await getOrCreateGame(user);
  expect(game).toBeTruthy();
});

test('current game', async () => {
  const user = await createNewUser();
  expect(user).toBeTruthy();

  const altUser = await createNewUser();
  expect(altUser).toBeTruthy();

  const game = await createNewGame(user);
  expect(game).toBeTruthy();

  const currentGame = await getGame(user);
  expect(currentGame).toBeTruthy();
  expect(game).toEqual(currentGame);

  const gameById = await getGameById(game.id);
  expect(gameById).toBeTruthy();
  expect(game).toEqual(gameById);

  const alsoCurrentGame = await getOrCreateGame(user);
  expect(alsoCurrentGame).toBeTruthy();
  expect(game).toEqual(alsoCurrentGame);

  const altGame = await getOrCreateGame(altUser);
  expect(altGame).toBeTruthy();
  expect(game).not.toEqual(altGame);

  await updateGame({ id: game.id, win: true });
  const updatedGame = await getGameById(game.id);
  expect(updatedGame.win).toBe(true);

  await updateGame({ id: altGame.id, win: false });
  const altUpdatedGame = await getGameById(altGame.id);
  expect(altUpdatedGame.win).toBe(false);
});
