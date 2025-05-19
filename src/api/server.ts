import cors from '@fastify/cors';
import postgres from '@fastify/postgres';
import Fastify from 'fastify';

import { evaluateAttempt } from './codemaker';

const server = Fastify({
  logger: true,
});
await server.register(cors, {});
await server.register(postgres, {
  connectionString: 'postgres://postgres@localhost/postgres',
});

// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           pong: {
//             type: 'string',
//           },
//         },
//       },
//     },
//   },
// };
// server.get('/ping', opts, async () => {
//   return { pong: 'it worked!' };
// });

// server.get('/db', opts, async () => {
//   server.pg.connect(onConnect);

//   function onConnect (err, client, release) {
//     if (err) return reply.send(err)

//     client.query(
//       'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
//       function onResult (err, result) {
//         release()
//         reply.send(err || result)
//       }
//     )
//   }

//   // return { pong: 'it worked!' };
// });

// create database
// create tables

// CREATE TABLE IF NOT EXISTS tab_name(
// first_col data_type,
// second_col data_type,
// third_col data_type,
// .....
// nth_col data_type
// );

server.get('/user/:id', function (req, reply) {
  server.pg.query(
    'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

server.get<{
  Params: {
    code: string;
  };
}>('/try/:code', function (request, reply) {
  const code = request.params.code;
  const data = evaluateAttempt(code);
  reply.send({ code, feedback: data });
});

// server.route({
//   method: 'GET',
//   url: '/example',
//   schema: {
//     // request needs to have a querystring with a `name` parameter
//     querystring: {
//       type: 'object',
//       properties: {
//         name: { type: 'string' },
//       },
//       required: ['name'],
//     },
//     // the response needs to be an object with an `hello` property of type 'string'
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           hello: { type: 'string' },
//         },
//       },
//     },
//   },
//   // this function is executed for every request before the handler is executed
//   preHandler: async (request, reply) => {
//     // E.g. check authentication
//   },
//   handler: async (request, reply) => {
//     return { hello: 'world' };
//   },
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
