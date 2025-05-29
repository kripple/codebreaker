import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'src/api/db/migrations',
  schema: 'src/api/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
