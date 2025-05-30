import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  varchar,
} from 'drizzle-orm/pg-core';

import { timestamps } from '@/api/db/helpers/timestamps';
import { GenericGame } from '@/api/db/schema/generic_games';

export const turnsEnum = pgEnum('turns', [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
]);

export const Attempt = pgTable(
  'attempts',
  {
    game_id: integer()
      .references(() => GenericGame.id)
      .notNull(),
    turn: turnsEnum().notNull(),
    value: varchar().notNull(),
    feedback: varchar().notNull(),
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.game_id, table.turn] })],
);

export type Attempt = typeof Attempt.$inferSelect;
