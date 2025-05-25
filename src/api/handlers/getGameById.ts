import * as uuid from 'uuid';

import { getAttempts } from '@/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/db/adapters/daily_games';
import { createNewUser, getUser } from '@/db/adapters/users';

export async function getGameById(id: string) {
  const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
  const user = currentUser || (await createNewUser());
  const game = await getOrCreateDailyGame(user);
  const attempts = await getAttempts(game);
  return { user, attempts };
}
