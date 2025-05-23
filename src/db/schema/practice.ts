import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { config } from '@/constants';
import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';
import { User } from '@/db/schema/user';

export const Practice = pgTable('practice', {
  id,
  win: boolean(),
  max_attempts: integer().notNull().default(config.maxAttempts),
  user_id: integer()
    .notNull()
    .references(() => User.id),
  solution: varchar().notNull(),
  solution_length: integer().notNull().default(config.solutionLength),
  ...timestamps,
});

export type Practice = typeof Practice.$inferSelect;
