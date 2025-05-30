import * as uuid from 'uuid';

import { createNewAttempt, getAttempts } from '@/api/db/adapters/attempts';
import { getOrCreateDailyGame } from '@/api/db/adapters/daily_games';
import { getGenericGame } from '@/api/db/adapters/generic_games';
import { getSolutionById } from '@/api/db/adapters/solutions';
import { getUser } from '@/api/db/adapters/users';
import { evaluateAttempt } from '@/api/helpers/codemaker';

export async function makeAttempt({
  attempt,
  order,
  db,
  id,
}: {
  attempt: string;
  order: string;
  db: AppDatabase;
  id: string;
}) {
  const user = uuid.validate(id) ? await getUser({ db, uuid: id }) : undefined;
  if (!user) throw Error('missing user');

  const dailyGame = await getOrCreateDailyGame({ db, user });
  const solution = await getSolutionById({ db, id: dailyGame.solution_id });
  if (!solution) throw Error('missing solution');

  const game = await getGenericGame({ db, game: dailyGame });
  if (!game) throw Error('missing game');

  const attemptsCount = (await getAttempts({ db, game })).length + 1;
  const parsed = parseInt(order);
  const gameAttemptOrder = Number.isNaN(parsed) ? undefined : parsed;
  if (!gameAttemptOrder) throw Error('failed to parse turn order');
  if (attemptsCount !== gameAttemptOrder) throw Error('409 Conflict'); // TODO: return as http response code

  const { feedback } = evaluateAttempt(attempt, solution.value);
  await createNewAttempt({
    db,
    game,
    feedback,
    attempt,
    order: gameAttemptOrder,
  });

  return { id: user.uuid };
}
