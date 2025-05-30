import { sql } from 'drizzle-orm';
import { check, index, integer, pgTable } from 'drizzle-orm/pg-core';

import { id } from '@/api/db/helpers/id';
import { timestamps } from '@/api/db/helpers/timestamps';
import { AdhocGame } from '@/api/db/schema/adhoc_games';
import { DailyGame } from '@/api/db/schema/daily_games';

export const GenericGame = pgTable(
  'generic_games',
  {
    id,
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
    index('daily_game_idx').on(table.daily_game_id),
    index('adhoc_game_idx').on(table.adhoc_game_id),
  ],
);

export type GenericGame = typeof GenericGame.$inferSelect;
