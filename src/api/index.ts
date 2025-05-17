import cors from '@fastify/cors';
import Fastify from 'fastify';

import { evaluateAttempt } from './codemaker';

const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, {});

fastify.get<{
  Params: {
    code: string;
  };
}>('/try/:code', function (request, reply) {
  const code = request.params.code;
  const data = evaluateAttempt(code);
  reply.send({ code, feedback: data });
});

fastify.listen({ port: 3000 }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
