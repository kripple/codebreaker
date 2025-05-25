import * as uuid from 'uuid';

import { getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { createNewUser, getUser } from '@/api/db/adapters/users';

export async function getGameById(id: string) {
  const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
  const user = currentUser || (await createNewUser());
  const game = await getOrCreateDailyGame(user);
  const attempts = await getAttempts(game);
  return { user, attempts };
}
