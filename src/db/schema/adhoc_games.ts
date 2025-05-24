import { index, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
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
  (table) => [index('adhoc_game_user_idx').on(table.user_id)],
);

export type AdhocGame = typeof AdhocGame.$inferSelect;
