import { eq } from 'drizzle-orm';

import { AdhocGame } from '@/api/db/schema/adhoc_games';
import type { User } from '@/api/db/schema/users';
import { makeSecretCode } from '@/api/helpers/codemaker';

export async function createNewAdhocGame({
  db,
  user,
}: {
  db: AppDatabase;
  user: User;
}): Promise<AdhocGame> {
  console.info(`create new adhoc game for user '${user.id}'`);

  const solution = makeSecretCode();
  const games = await db
    .insert(AdhocGame)
    .values({ user_id: user.id, solution })
    .returning();
  const game = games.pop();
  if (!game) {
    throw Error('failed to create new adhoc game');
  }
  return game;
}

export async function getAdhocGameById({
  db,
  id,
}: {
  db: AppDatabase;
  id: number;
}): Promise<AdhocGame> {
  const games = await db.select().from(AdhocGame).where(eq(AdhocGame.id, id));
  const game = games.pop();
  if (!game) throw Error('failed to find adhoc game by id');
  return game;
}
