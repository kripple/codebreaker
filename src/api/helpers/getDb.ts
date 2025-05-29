import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import type { EnvContext } from '@/api/helpers/getEnv';

export function getDb(env: EnvContext): AppDatabase {
  const sql = neon(env.connectionString);
  const db = drizzle({ client: sql });
  return db;
}
