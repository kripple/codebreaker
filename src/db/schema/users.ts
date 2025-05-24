import { pgTable, uuid } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { indexOn } from '@/db/helpers/indexOn';
import { timestamps } from '@/db/helpers/timestamps';

export const User = pgTable(
  'users',
  {
    id,
    uuid: uuid().defaultRandom().unique().notNull(),
    ...timestamps,
  },
  (table) => [indexOn({ table, columnName: 'uuid', unique: true })],
);

export type User = typeof User.$inferSelect;
