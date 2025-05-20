import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { config } from '@/app/constants';
import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';
import { User } from '@/db/schema/user';

export const Game = pgTable('game', {
  id,
  win: boolean(),
  secret_code: varchar().notNull(),
  max_attempts: integer().notNull().default(config.allowedAttempts),
  user_id: integer().references(() => User.id),
  ...timestamps,
});

export type Game = typeof Game.$inferSelect;
export type InsertGame = typeof Game.$inferInsert;
