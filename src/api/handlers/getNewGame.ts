import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewUser } from '@/api/db/adapters/users';

export async function getNewGame() {
  const user = await createNewUser();
  const game = await getOrCreateDailyGame(user);
  const attempts = await getAttempts(game);
  return { user, attempts };
}
