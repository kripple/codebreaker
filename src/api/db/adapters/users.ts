import { desc, eq } from 'drizzle-orm';
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';

import { User } from '@/api/db/schema/users';

export async function createNewUser({
  db,
}: {
  db: PgDatabase<PgQueryResultHKT>;
}): Promise<User> {
  const users = await db.insert(User).values({}).returning();
  const user = users.pop();
  if (!user) {
    throw Error('failed to create new user');
  }
  return user;
}

export async function getUser({
  db,
  uuid,
}: {
  db: PgDatabase<PgQueryResultHKT>;
  uuid: string;
}): Promise<User | undefined> {
  const users = await db
    .select()
    .from(User)
    .where(eq(User.uuid, uuid))
    .orderBy(desc(User.created_at))
    .limit(1);
  const user = users.pop();
  return user;
}
