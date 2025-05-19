/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NodePgClient } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { FastifyInstance as Instance } from 'fastify';

// export interface FastifyInstance<
//   HttpServer = Server,
//   HttpRequest = IncomingMessage,
//   HttpResponse = ServerResponse,
// > {
//   db: NodePgClient;
// }

declare module 'fastify' {
  export interface FastifyInstance extends Instance {
    db: ReturnType<typeof drizzle>;
  }
}

// import fastify from 'fastify';

// declare module 'fastify' {
//   export interface FastifyInstance<
//     HttpServer = Server,
//     HttpRequest = IncomingMessage,
//     HttpResponse = ServerResponse,
//   > {
//     port: number;
//   }
// }
