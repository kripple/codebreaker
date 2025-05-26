import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';
import * as uuid from 'uuid';

import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewUser, getUser } from '@/api/db/adapters/users';

export async function getGameById({
  db,
  id,
}: {
  db: PgDatabase<PgQueryResultHKT>;
  id: string;
}) {
  const currentUser = uuid.validate(id)
    ? await getUser({ db, uuid: id })
    : undefined;
  const user = currentUser || (await createNewUser({ db }));
  const game = await getOrCreateDailyGame({ db, user });
  const attempts = await getAttempts({ db, game });
  return { user, attempts };
}
