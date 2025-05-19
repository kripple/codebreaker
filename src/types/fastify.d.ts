import { drizzle } from 'drizzle-orm/node-postgres';
import type { FastifyInstance as Instance } from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance extends Instance {
    db: ReturnType<typeof drizzle>;
  }
}
