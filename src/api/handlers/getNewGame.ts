import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewGenericGame } from '@/api/db/adapters/generic_games';
import { createNewUser } from '@/api/db/adapters/users';

export async function getNewGame({ db }: { db: AppDatabase }) {
  const user = await createNewUser({ db });
  const { game: dailyGame, date } = await getOrCreateDailyGame({ db, user });
  const game = await createNewGenericGame({ db, game: dailyGame });
  const attempts = await getAttempts({ db, game });
  return { user, attempts, date };
}
