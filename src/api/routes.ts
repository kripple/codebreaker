import { getGameById } from '@/api/handlers/getGameById';
import { getNewGame } from '@/api/handlers/getNewGame';
import { makeAttempt } from '@/api/handlers/makeAttempt';
import { getGame } from '@/api/helpers/getGame';
import type { server as apiServer } from '@/api/server';
import type { Game } from '@/types/game';

type Server = typeof apiServer;

export const routes = [
  (server: Server) =>
    server.get<{
      Reply: Game;
    }>('/game/new', async function (_request, reply) {
      try {
        const data = await getNewGame();
        reply.send(getGame(data));
      } catch (error) {
        console.error('unexpected error', error);
        reply.code(500);
      }
    }),

  (server: Server) =>
    server.get<{
      Params: { id: string };
      Reply: Game;
    }>('/game/:id', async function (request, reply) {
      try {
        const id = request.params.id;
        const data = await getGameById(id);
        reply.send(getGame(data));
      } catch (error) {
        console.error('unexpected error', error);
        reply.code(500);
      }
    }),

  (server: Server) =>
    server.post<{
      Params: {
        id: string;
        code: string;
      };
      Reply: {
        id: string;
      };
    }>('/game/:id/try/:code', async function (request, reply) {
      try {
        const id = request.params.id;
        const attempt = request.params.code;
        const data = await makeAttempt({ id, attempt });
        reply.send(data);
      } catch (error) {
        console.error('unexpected error', error);
        reply.code(500);
      }
    }),
] as const;
