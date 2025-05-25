import { timestamp } from 'drizzle-orm/pg-core';

const options = { withTimezone: true } as const;

export const timestamps = {
  created_at: timestamp(options).defaultNow().notNull(),
  updated_at: timestamp(options),
  deleted_at: timestamp(options),
};
