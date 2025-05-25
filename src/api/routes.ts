import { getGameById } from '@/api/handlers/getGameById';
import { getNewGame } from '@/api/handlers/getNewGame';
import { makeAttempt } from '@/api/handlers/makeAttempt';
import { type Data, type Route, replyWith } from '@/api/helpers/replyWith';
import type { server as apiServer } from '@/api/server';

type Server = typeof apiServer;

export const routes = [
  (server: Server) =>
    server.get<Route<void, Data>>(
      '/game/new',
      async function (_request, reply) {
        try {
          const data = await getNewGame();
          reply.send({ data: replyWith(data) });
        } catch (error) {
          server.log.error('unexpected error', error);
          reply.send({ error });
        }
      },
    ),

  (server: Server) =>
    server.get<Route<{ id: string }, Data>>(
      '/game/:id',
      async function (request, reply) {
        try {
          const id = request.params.id;
          const data = await getGameById(id);
          reply.send({ data: replyWith(data) });
        } catch (error) {
          server.log.error('unexpected error', error);
          reply.send({ error });
        }
      },
    ),

  (server: Server) =>
    server.post<
      Route<
        {
          id: string;
          code: string;
        },
        { id: string }
      >
    >('/game/:id/try/:code', async function (request, reply) {
      try {
        const id = request.params.id;
        const attempt = request.params.code;
        const data = await makeAttempt({ id, attempt });
        reply.send({ data });
      } catch (error) {
        server.log.error('unexpected error', error);
        reply.send({ error });
      }
    }),
] as const;
