import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';

import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewUser } from '@/api/db/adapters/users';

export async function getNewGame({ db }: { db: PgDatabase<PgQueryResultHKT> }) {
  const user = await createNewUser({ db });
  const game = await getOrCreateDailyGame({ db, user });
  const attempts = await getAttempts({ db, game });
  return { user, attempts };
}
