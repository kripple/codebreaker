import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { indexOn } from '@/db/helpers/indexOn';
import { timestamps } from '@/db/helpers/timestamps';
import { User } from '@/db/schema/users';

export const AdhocGame = pgTable(
  'adhoc_games',
  {
    id,
    solution: varchar().notNull(),
    user_id: integer()
      .notNull()
      .references(() => User.id),
    ...timestamps,
  },
  (table) => [indexOn({ table, columnName: 'user_id', unique: false })],
);

export type AdhocGame = typeof AdhocGame.$inferSelect;
