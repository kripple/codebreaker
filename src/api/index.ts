import * as uuid from 'uuid';

import { evaluateAttempt } from '@/api/providers/codemaker';
import { getGame, getOrCreateGame } from '@/api/providers/game';
import { server } from '@/api/providers/server';
import { createNewUser, getUser } from '@/api/providers/user';

server.get('/game/new', async function (_request, reply) {
  try {
    const user = await createNewUser();
    server.log.info(`create new user '${user.id}'`);
    const result = await getOrCreateGame(user);
    reply.send(result);
  } catch (error) {
    server.log.error('unexpected error', error);
    reply.send(error);
  }
});

server.get<{
  Params: {
    id: string;
  };
}>('/game/:id', async function (request, reply) {
  try {
    const id = request.params.id;

    const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
    if (currentUser) server.log.info(`get user by id '${currentUser.id}'`);

    const user = currentUser || (await createNewUser());
    if (!currentUser)
      server.log.info(`failed to get user by id, create new user '${user.id}'`);

    const result = await getOrCreateGame(user);
    reply.send(result);
  } catch (error) {
    server.log.error('unexpected error', error);
    reply.send(error);
  }
});

server.get<{
  Params: {
    id: string;
    code: string;
  };
}>('/game/:id/try/:code', async function (request, reply) {
  const id = request.params.id;
  const code = request.params.code;

  const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
  if (!currentUser) throw Error('missing user');
  server.log.info(`get user by id '${currentUser.id}'`);

  const currentGame = await getGame(currentUser);
  if (!currentGame) throw Error('missing game');
  server.log.info(`get game by id '${currentGame.id}'`);

  // const data = evaluateAttempt(code);
  const tempData = '----';
  const result = {
    id: currentUser.uuid,
    code,
    feedback: tempData,
  };
  reply.send(result);
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
