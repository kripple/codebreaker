import { boolean, integer, pgTable } from 'drizzle-orm/pg-core';

import { config } from '@/constants';
import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';
import type { Attempt } from '@/db/schema/attempt';
import { Solution } from '@/db/schema/solution';
import { User } from '@/db/schema/user';

export const Game = pgTable('game', {
  id,
  win: boolean(),
  max_attempts: integer().notNull().default(config.maxAttempts),
  user_id: integer()
    .notNull()
    .references(() => User.id),
  solution_id: integer()
    .notNull()
    .references(() => Solution.id),
  ...timestamps,
});

export type Game = typeof Game.$inferSelect;
export type GameData = Game & { solution: Solution } & { attempts: Attempt[] };
