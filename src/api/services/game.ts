import { sql } from 'drizzle-orm';

import { server } from '@/api/services/server';
import { Game } from '@/db/schema/game';
import { User } from '@/db/schema/user';

// TODO
const tempSolution = '1234' as const;
// new record type SecretCode to create a shared daily challenge

export async function createNewGame(user: User): Promise<Game> {
  server.log.info(`create new game for user '${user.id}'`);

  const games = await server.db
    .insert(Game)
    .values({ user_id: user.id, secret_code: tempSolution })
    .returning();

  const game = games.pop();
  if (!game) {
    throw Error('failed to create new game');
  }
  return game;
}

export async function getGame(user: User): Promise<Game | undefined> {
  const games = await server.db
    .select()
    .from(Game)
    .where(sql`${Game.user_id} = ${user.id}`);
  // .where(sql`${Game.user_id} = ${user.id} AND ${Game.win} = null`);
  // sort by most recently created
  const game = games.pop();
  return game;
}
