import { date, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/api/db/helpers/id';
import { timestamps } from '@/api/db/helpers/timestamps';

export const Solution = pgTable(
  'solutions',
  {
    id,
    value: varchar().notNull().unique(),
    date: date().defaultNow().notNull().unique(),
    ...timestamps,
  },
  (table) => [uniqueIndex('daily_game_solution_date_idx').on(table.date)],
);

export type Solution = typeof Solution.$inferSelect;
