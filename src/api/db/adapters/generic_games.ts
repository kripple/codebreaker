import { eq } from 'drizzle-orm';

import type { AdhocGame } from '@/api/db/schema/adhoc_games';
import type { DailyGame } from '@/api/db/schema/daily_games';
import { GenericGame } from '@/api/db/schema/generic_games';

export async function createNewGenericGame({
  db,
  game,
}: {
  db: AppDatabase;
  game: DailyGame | AdhocGame;
}): Promise<GenericGame> {
  console.info('create new generic game');
  const isDailyGame = 'solution_id' in game;
  const key = isDailyGame ? 'daily_game_id' : 'adhoc_game_id';
  const generic_games = await db
    .insert(GenericGame)
    .values({
      [key]: game.id,
    })
    .returning();

  const generic_game = generic_games.pop();
  if (!generic_game) {
    throw Error('failed to create new generic game');
  }
  return generic_game;
}

export async function getGenericGame({
  db,
  game,
}: {
  db: AppDatabase;
  game: DailyGame | AdhocGame;
}): Promise<GenericGame | undefined> {
  console.info('get generic game');
  const isDailyGame = 'solution_id' in game;
  const key = isDailyGame
    ? GenericGame.daily_game_id
    : GenericGame.adhoc_game_id;
  const generic_games = await db
    .select()
    .from(GenericGame)
    .where(eq(key, game.id));
  const generic_game = generic_games.pop();
  return generic_game;
}

export async function getOrCreateGenericGame({
  db,
  game,
}: {
  db: AppDatabase;
  game: DailyGame | AdhocGame;
}): Promise<GenericGame> {
  console.info('get or create generic game');
  const currentGame = await getGenericGame({ db, game });
  if (currentGame) console.info(`get generic game '${currentGame.id}'`);

  const genericGame = currentGame || (await createNewGenericGame({ db, game }));
  if (!currentGame) console.info(`create new generic game '${game.id}'`);

  return genericGame;
}
