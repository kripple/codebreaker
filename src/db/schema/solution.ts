import { date, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { config } from '@/constants';
import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';

export const Solution = pgTable('solution', {
  id,
  value: varchar().notNull(),
  length: integer().notNull().default(config.solutionLength),
  creation_date: date().defaultNow().notNull().unique(),
  ...timestamps,
});

export type Solution = typeof Solution.$inferSelect;
