import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { id } from '@/db/helpers/id';
import { timestamps } from '@/db/helpers/timestamps';
import { Game } from '@/db/schema/game';

export const Attempt = pgTable('attempt', {
  id,
  code: varchar().notNull(),
  feedback: varchar().notNull(),
  game_id: integer()
    .references(() => Game.id)
    .notNull(),
  ...timestamps,
});

export type Attempt = typeof Attempt.$inferSelect;
