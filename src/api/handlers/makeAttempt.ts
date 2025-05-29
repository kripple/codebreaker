import * as uuid from 'uuid';

import { createNewAttempt } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { getSolutionById } from '@/api/db/adapters/solutions';
import { getUser } from '@/api/db/adapters/users';
import { evaluateAttempt } from '@/api/helpers/codemaker';

export async function makeAttempt({
  attempt,
  db,
  id,
}: {
  attempt: string;
  db: AppDatabase;
  id: string;
}) {
  const user = uuid.validate(id) ? await getUser({ db, uuid: id }) : undefined;
  if (!user) throw Error('missing user');

  const game = await getOrCreateDailyGame({ db, user });
  const solution = await getSolutionById({ db, id: game.solution_id });
  if (!solution) throw Error('missing solution');

  const { feedback } = evaluateAttempt(attempt, solution.value);
  await createNewAttempt({
    db,
    game,
    feedback,
    attempt,
  });

  return { id: user.uuid };
}
