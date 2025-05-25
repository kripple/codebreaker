import cors from '@fastify/cors';
import Fastify from 'fastify';

import fastifyDrizzlePlugin from '@/api/plugins/drizzle-plugin';

const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, {});
await fastify.register(fastifyDrizzlePlugin, {
  connection: 'postgres://postgres:supersecure@localhost:5432/postgres',
});

export const server = fastify;
