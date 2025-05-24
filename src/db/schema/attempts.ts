import { sql } from 'drizzle-orm';
import { check, index, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';
import { AdhocGame } from '@/db/schema/adhoc_games';
import { DailyGame } from '@/db/schema/daily_games';

export const Attempt = pgTable(
  'attempts',
  {
    id,
    value: varchar().notNull(),
    feedback: varchar().notNull(),
    daily_game_id: integer().references(() => DailyGame.id),
    adhoc_game_id: integer().references(() => AdhocGame.id),
    ...timestamps,
  },
  (table) => [
    check(
      'game_type',
      sql`
      (${table.daily_game_id} IS NOT NULL AND ${table.adhoc_game_id} IS NULL)
      OR
      (${table.daily_game_id} IS NULL AND ${table.adhoc_game_id} IS NOT NULL)
    `,
    ),
    index('daily_game_attempt_idx').on(table.daily_game_id),
    index('adhoc_game_attempt_idx').on(table.adhoc_game_id),
  ],
);

export type Attempt = typeof Attempt.$inferSelect;
