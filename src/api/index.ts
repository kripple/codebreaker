import * as uuid from 'uuid';

import { createNewAttempt } from '@/api/providers/attempt';
import { evaluateAttempt } from '@/api/providers/codemaker';
import {
  createNewGame,
  getGame,
  getGameById,
  getOrCreateGame,
} from '@/api/providers/game';
import { server } from '@/api/providers/server';
import { createNewUser, getUser } from '@/api/providers/user';
import type { GameData } from '@/db/schema/game';
import type { User } from '@/db/schema/user';

type ResponseData = {
  id: string;
  maxAttempts: number;
  solutionLength: number;
  attempts: {
    value: string;
    feedback: string;
  }[];
};
type Reply = { data: ResponseData } | { error: unknown };

function replyWith({
  user,
  game,
}: {
  user: User;
  game: GameData;
}): ResponseData {
  return {
    id: user.uuid,
    maxAttempts: game.max_attempts,
    solutionLength: game.solution.length,
    // TODO: make sure these are in the correct order
    attempts: (game.attempts || []).map((attempt) => ({
      value: attempt.value,
      feedback: attempt.feedback,
    })),
  };
}

server.get<{
  Reply: Reply;
}>('/game/new', async function (_request, reply) {
  try {
    const user = await createNewUser();
    server.log.info(`create new user '${user.id}'`);
    const game = await createNewGame(user);
    server.log.info(`create new game '${user.id}'`);
    reply.send({ data: replyWith({ user, game }) });
  } catch (error) {
    server.log.error('unexpected error', error);
    reply.send({ error });
  }
});

server.get<{
  Params: {
    id: string;
  };
  Reply: Reply;
}>('/game/:id', async function (request, reply) {
  try {
    const id = request.params.id;

    const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
    if (currentUser) server.log.info(`get user by id '${currentUser.id}'`);

    const user = currentUser || (await createNewUser());
    if (!currentUser)
      server.log.info(`failed to get user by id, create new user '${user.id}'`);

    const game = await getOrCreateGame(user);
    reply.send({ data: replyWith({ user, game }) });
  } catch (error) {
    server.log.error('unexpected error', error);
    reply.send({ error });
  }
});

server.get<{
  Params: {
    id: string;
    code: string;
  };
  Reply: Reply;
}>('/game/:id/try/:code', async function (request, reply) {
  try {
    const id = request.params.id;
    const attempt = request.params.code;

    const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
    if (!currentUser) throw Error('missing user');
    server.log.info(`get user by id '${currentUser.id}'`);

    const currentGame = await getGame(currentUser);
    if (!currentGame) throw Error('missing game');
    server.log.info(`get game by id '${currentGame.id}'`);

    if (currentGame.win !== null) {
      reply.code(400);
      reply.send({ error: 'game is locked' });
    }
    if (currentGame.attempts.length >= currentGame.max_attempts) {
      reply.code(400);
      reply.send({ error: 'exceeded max attempts' });
    }

    const feedback = evaluateAttempt(attempt, currentGame.solution.value);
    await createNewAttempt({
      game: currentGame,
      feedback,
      attempt,
    });

    // refetch game
    // TODO: consider adding new data to the response manually instead of refetching
    // (manually augmenting the response would be faster, if more prone to human error)
    const game = await getGameById(currentGame.id);
    reply.send({ data: replyWith({ user: currentUser, game }) });
  } catch (error) {
    server.log.error('unexpected error', error);
    reply.send({ error });
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    server.log.info(`Server listening on port ${port}.`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
