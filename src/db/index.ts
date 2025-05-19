import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import { User } from '@/db/schema/user';

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
});

async function main() {
  const user = await db.insert(User).values({});
  console.log('New user created!', user);

  const users = await db.select().from(User);
  console.log('Getting all users from the database: ', users);

  // const result = await db.query.users.findMany({
  //   with: {
  //     posts: true,
  //   },
  // });

  // await db.delete(usersTable).where(eq(usersTable.id, user.id));
  // console.log('User deleted!');
}

main();
