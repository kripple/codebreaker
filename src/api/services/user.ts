import { sql } from 'drizzle-orm';

import { server } from '@/api/services/server';
import { User } from '@/db/schema/user';

export async function createNewUser(): Promise<User> {
  const users = await server.db.insert(User).values({}).returning();
  const user = users.pop();
  if (!user) {
    throw Error('failed to create new user');
  }
  return user;
}

export async function getUser(uuid: string): Promise<User | undefined> {
  const users = await server.db
    .select()
    .from(User)
    .where(sql`${User.uuid} = ${uuid}`);
  const user = users.pop();
  return user;
}
