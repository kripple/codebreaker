import cors from '@fastify/cors';
import { sql } from 'drizzle-orm';
import Fastify from 'fastify';
import * as uuid from 'uuid';

import { evaluateAttempt } from '@/api/services/codemaker';
import { Game } from '@/db/schema/game';
import { User } from '@/db/schema/user';
import fastifyDrizzlePlugin from '@/plugins/drizzle-plugin';

const server = Fastify({
  logger: true,
});
await server.register(cors, {});
await server.register(fastifyDrizzlePlugin, {
  connection: 'postgres://postgres:supersecure@localhost:5432/postgres',
});

// server.get('/users/:id/game/:game_id', async function (_req, reply) {
//   // step 1 - is this a known user?
//   //   yes -> get user
//   //   no -> create a new user

//   const users = await server.db.select().from(User);
//   reply.send(users);
// });

async function createNewUser() {
  const users = await server.db
    .insert(User)
    .values({})
    .returning({ id: User.uuid });
  const user = users.pop();
  if (!user) {
    throw Error('failed to create new user');
  }
  return user;
}

async function getUser(uuid: string) {
  const users = await server.db
    .select()
    .from(User)
    .where(sql`${User.uuid} = ${uuid}`);
  const user = users.pop();
  if (!user) {
    throw Error('failed to get user');
  }
  return {
    id: user.uuid,
  };
}

server.get('/users/new', async function (_request, reply) {
  try {
    const user = await createNewUser();
    server.log.info(`create new user '${user.id}'`);
    reply.send(user);
  } catch (error) {
    server.log.error(error);
    reply.send(error);
  }
});

server.get<{
  Params: {
    id: string;
  };
}>('/users/:id', async function (request, reply) {
  try {
    const id = request.params.id;
    // if (!uuid.validate(id)) {
    //   const newUser = createNewUser();
    //   reply.send(newUser);
    //   return;
    // }
    const user = await getUser(id);
    if (user) {
      server.log.info(`get user by id, return existing user '${user.id}'`);
      reply.send(user);
    } else {
      const newUser = await createNewUser();
      server.log.info(
        `failed to get user by id, create new user '${newUser.id}'`,
      );
      reply.send(newUser);
    }
  } catch (error) {
    server.log.error(error);
    reply.send(error);
  }
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
