import { eq } from 'drizzle-orm';

import { makeSecretCode } from '@/api/helpers/codemaker';
import { server } from '@/api/server';
import { AdhocGame } from '@/db/schema/adhoc_games';
import type { User } from '@/db/schema/users';

export async function createNewAdhocGame(user: User): Promise<AdhocGame> {
  server.log.info(`create new adhoc game for user '${user.id}'`);

  const solution = makeSecretCode();
  const games = await server.db
    .insert(AdhocGame)
    .values({ user_id: user.id, solution })
    .returning();
  const game = games.pop();
  if (!game) {
    throw Error('failed to create new adhoc game');
  }
  return game;
}

export async function getAdhocGameById(id: number): Promise<AdhocGame> {
  const games = await server.db
    .select()
    .from(AdhocGame)
    .where(eq(AdhocGame.id, id));
  const game = games.pop();
  if (!game) throw Error('failed to find adhoc game by id');
  return game;
}
