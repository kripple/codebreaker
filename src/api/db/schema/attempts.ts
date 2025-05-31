import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from 'drizzle-orm/pg-core';

import { timestamps } from '@/api/db/helpers/timestamps';
import { GenericGame } from '@/api/db/schema/generic_games';

export const Attempt = pgTable(
  'attempts',
  {
    game_id: integer()
      .references(() => GenericGame.id)
      .notNull(),
    game_attempts_order: integer().notNull(),
    value: varchar().notNull(),
    feedback: varchar().notNull(),
    ...timestamps,
  },
  (table) => [
    check(
      'game_attempts_order_check',
      sql`
      (${table.game_attempts_order} > 0 AND ${table.game_attempts_order} < 17)
    `,
    ),
    primaryKey({
      name: 'id',
      columns: [table.game_id, table.game_attempts_order],
    }),
    index('game_attempts_idx').on(table.game_id),
  ],
);

export type Attempt = typeof Attempt.$inferSelect;
