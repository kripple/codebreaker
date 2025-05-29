import type { NeonQueryFunction } from '@neondatabase/serverless';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

export type AppDatabase = NeonHttpDatabase<Record<string, never>> & {
  $client: NeonQueryFunction<false, false>;
};
