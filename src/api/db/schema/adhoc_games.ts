import { index, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/api/db/helpers/id';
import { timestamps } from '@/api/db/helpers/timestamps';
import { User } from '@/api/db/schema/users';

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
  (table) => [index('adhoc_game_user_idx').on(table.user_id)],
);

export type AdhocGame = typeof AdhocGame.$inferSelect;
