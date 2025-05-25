import { getAttempts } from '@/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/db/adapters/daily_games';
import { createNewUser } from '@/db/adapters/users';

export async function getNewGame() {
  const user = await createNewUser();
  const game = await getOrCreateDailyGame(user);
  const attempts = await getAttempts(game);
  return { user, attempts };
}
