import * as uuid from 'uuid';

import { evaluateAttempt } from '@/api/helpers/codemaker';
import { replyWith } from '@/api/helpers/replyWith';
import { server } from '@/api/server';
import { createNewAttempt } from '@/db/adapters/attempts';
// import {
//   createNewGame,
//   getGame,
//   getGameData,
//   getOrCreateGame,
//   updateGame,
// } from '@/db/adapters/daily_games';
import { createNewUser, getUser } from '@/db/adapters/users';
import type { Reply } from '@/types/reply';

// server.get<{
//   Reply: Reply;
// }>('/game/new', async function (_request, reply) {
//   try {
//     const user = await createNewUser();
//     server.log.info(`create new user '${user.id}'`);
//     const game = await createNewGame(user);
//     server.log.info(`create new game '${user.id}'`);
//     const { solution, attempts } = await getGameData(game);
//     reply.send({ data: replyWith({ user, game, solution, attempts }) });
//   } catch (error) {
//     server.log.error('unexpected error', error);
//     reply.send({ error });
//   }
// });

// server.get<{
//   Params: {
//     id: string;
//   };
//   Reply: Reply;
// }>('/game/:id', async function (request, reply) {
//   try {
//     const id = request.params.id;

//     const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
//     if (currentUser) server.log.info(`get user by id '${currentUser.id}'`);

//     const user = currentUser || (await createNewUser());
//     if (!currentUser)
//       server.log.info(`failed to get user by id, create new user '${user.id}'`);

//     const game = await getOrCreateGame(user);
//     const { solution, attempts } = await getGameData(game);
//     reply.send({ data: replyWith({ user, game, solution, attempts }) });
//   } catch (error) {
//     server.log.error('unexpected error', error);
//     reply.send({ error });
//   }
// });

// server.post<{
//   Params: {
//     id: string;
//     code: string;
//   };
// }>('/game/:id/try/:code', async function (request, reply) {
//   try {
//     const id = request.params.id;
//     const attempt = request.params.code;

//     const currentUser = uuid.validate(id) ? await getUser(id) : undefined;
//     if (!currentUser) throw Error('missing user');
//     server.log.info(`get user by id '${currentUser.id}'`);

//     const currentGame = await getGame(currentUser);
//     if (!currentGame) throw Error('missing game');
//     server.log.info(`get game by id '${currentGame.id}'`);

//     if (currentGame.win !== null) {
//       reply.code(400);
//       reply.send({ error: 'game is locked' });
//     }

//     const { solution, attempts } = await getGameData(currentGame);
//     if (attempts.length >= currentGame.max_attempts) {
//       reply.code(400);
//       reply.send({ error: 'exceeded max attempts' });
//     }

//     const { feedback, win } = evaluateAttempt(attempt, solution.value);
//     await createNewAttempt({
//       game: currentGame,
//       feedback,
//       attempt,
//     });

//     // did we win?
//     if (win) {
//       // we win! update game record before proceeding
//       await updateGame({ id: currentGame.id, win: true });
//     } else {
//       // was this our last chance?
//       if (attempts.length + 1 === currentGame.max_attempts) {
//         // it *was* our last chance. update game record before proceeding
//         await updateGame({ id: currentGame.id, win: false });
//       }
//     }

//     reply.code(201);
//     reply.send({ id: currentUser.id });
//   } catch (error) {
//     server.log.error('unexpected error', error);
//     reply.send({ error });
//   }
// });

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
