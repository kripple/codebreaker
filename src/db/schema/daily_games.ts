import { index, integer, pgTable } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
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
    index('daily_game_user_idx').on(table.user_id),
    index('daily_game_solution_idx').on(table.solution_id),
  ],
);

export type DailyGame = typeof DailyGame.$inferSelect;
