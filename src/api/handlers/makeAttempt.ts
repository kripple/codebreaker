import * as uuid from 'uuid';

import { evaluateAttempt } from '@/api/helpers/codemaker';
import { createNewAttempt } from '@/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/db/adapters/daily_games';
import { getSolutionById } from '@/db/adapters/solutions';
import { getUser } from '@/db/adapters/users';

export async function makeAttempt({
  id,
  attempt,
}: {
  id: string;
  attempt: string;
}) {
  const user = uuid.validate(id) ? await getUser(id) : undefined;
  if (!user) throw Error('missing user');

  const game = await getOrCreateDailyGame(user);
  const solution = await getSolutionById(game.solution_id);
  if (!solution) throw Error('missing solution');

  const { feedback } = evaluateAttempt(attempt, solution.value);
  await createNewAttempt({
    game,
    feedback,
    attempt,
  });

  return { id: user.uuid };
}
