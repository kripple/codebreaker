import { sql } from 'drizzle-orm';
import { integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { config } from '@/constants';
import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';

export const Solution = pgTable(
  'solution',
  {
    id,
    value: varchar().notNull(),
    length: integer().notNull().default(config.solutionLength),
    ...timestamps,
  },
  (solution) => [
    uniqueIndex('annually_unique_solution_idx').on(
      solution.value,
      sql`immutable_year(${solution.created_at})`,
    ),
    uniqueIndex('daily_challenge_idx').on(
      sql`immutable_date(${solution.created_at})`,
    ),
  ],
);

export type Solution = typeof Solution.$inferSelect;
