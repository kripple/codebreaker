import { date, pgTable, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { indexOn } from '@/db/helpers/indexOn';
import { timestamps } from '@/db/helpers/timestamps';

export const Solution = pgTable(
  'solutions',
  {
    id,
    value: varchar().notNull().unique(),
    date: date().defaultNow().notNull().unique(),
    ...timestamps,
  },
  (table) => [indexOn({ table, columnName: 'not_date', unique: true })],
);

export type Solution = typeof Solution.$inferSelect;
