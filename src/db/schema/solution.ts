import { sql } from 'drizzle-orm';
import { integer, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { config } from '@/app/constants';
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
    uniqueIndex('solution_idx').on(
      solution.value,
      sql`immutable_year(${solution.created_at})`,
    ),
  ],
);

export type Solution = typeof Solution.$inferSelect;
