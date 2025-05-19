import cors from '@fastify/cors';
import Fastify from 'fastify';

import { evaluateAttempt } from '@/api/services/codemaker';
import { User } from '@/db/schema/user';
import fastifyDrizzlePlugin from '@/plugins/drizzle-plugin';

const server = Fastify({
  logger: true,
});
await server.register(cors, {});
await server.register(fastifyDrizzlePlugin, {
  connection: 'postgres://postgres:supersecure@localhost:5432/postgres',
});

server.get('/users', async function (_req, reply) {
  const users = await server.db.select().from(User);
  reply.send(users);
});

server.get<{
  Params: {
    code: string;
  };
}>('/try/:code', function (request, reply) {
  const code = request.params.code;
  const data = evaluateAttempt(code);
  reply.send({ code, feedback: data });
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
