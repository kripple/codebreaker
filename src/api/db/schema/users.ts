import { pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { id } from '@/api/db/helpers/id';
import { timestamps } from '@/api/db/helpers/timestamps';

export const User = pgTable(
  'users',
  {
    id,
    uuid: uuid().defaultRandom().unique().notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex('uuid_idx').on(table.uuid)],
);

export type User = typeof User.$inferSelect;
