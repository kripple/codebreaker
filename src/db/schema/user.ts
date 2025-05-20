import { pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';

export const User = pgTable(
  'user',
  {
    id,
    uuid: uuid().defaultRandom().unique().notNull(),
    ...timestamps,
  },
  (user) => [uniqueIndex('uuid_idx').on(user.uuid)],
);

export type User = typeof User.$inferSelect;
export type InsertUser = typeof User.$inferInsert;
