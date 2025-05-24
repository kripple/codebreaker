import { integer, pgTable } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { indexOn } from '@/db/helpers/indexOn';
import { timestamps } from '@/db/helpers/timestamps';
import { Solution } from '@/db/schema/solutions';
import { User } from '@/db/schema/users';

export const DailyGame = pgTable(
  'daily_games',
  {
    id,
    user_id: integer()
      .notNull()
      .references(() => User.id),
    solution_id: integer()
      .notNull()
      .references(() => Solution.id),
    ...timestamps,
  },
  (table) => [
    indexOn({ table, columnName: 'user_id', unique: false }),
    indexOn({ table, columnName: 'solution_id', unique: false }),
  ],
);

export type DailyGame = typeof DailyGame.$inferSelect;
