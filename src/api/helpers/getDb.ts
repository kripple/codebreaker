export async function getDb(): Promise<AppDatabase> {
   const { neon } = await import('@neondatabase/serverless');
  const { drizzle } = await import('drizzle-orm/neon-http');
  const connectionString = Netlify.env.get('DATABASE_URL');
  if (!connectionString) throw Error('missing db connection string');
  const sql = neon(connectionString);
  const db = drizzle({ client: sql });
  return db;
}
