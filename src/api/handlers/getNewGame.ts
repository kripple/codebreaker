import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewUser } from '@/api/db/adapters/users';

export async function getNewGame({ db }: { db: AppDatabase }) {
  const user = await createNewUser({ db });
  const game = await getOrCreateDailyGame({ db, user });
  const attempts = await getAttempts({ db, game });
  return { user, attempts };
}
