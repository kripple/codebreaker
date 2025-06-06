import * as uuid from 'uuid';

import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { getOrCreateGenericGame } from '@/api/db/adapters/generic_games';
import { createNewUser, getUser } from '@/api/db/adapters/users';

export async function getGameById({ db, id }: { db: AppDatabase; id: string }) {
  const currentUser = uuid.validate(id)
    ? await getUser({ db, uuid: id })
    : undefined;
  const user = currentUser || (await createNewUser({ db }));
  const { game: dailyGame, date } = await getOrCreateDailyGame({ db, user });
  const game = await getOrCreateGenericGame({ db, game: dailyGame });
  const attempts = await getAttempts({ db, game });
  return { user, attempts, date };
}
