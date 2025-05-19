import { drizzle } from 'drizzle-orm/node-postgres';
import type {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import fp from 'fastify-plugin';

function fastifyDrizzle(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction,
) {
  const db = drizzle({
    connection: options.connection,
    casing: 'snake_case',
  });

  if (!fastify.db) {
    fastify.decorate('db', db);
  }

  done();
}

export default fp(fastifyDrizzle, { name: 'fastify-drizzle' });
