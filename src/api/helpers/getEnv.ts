export type EnvContext = { allowedOrigins: string; connectionString: string };

export function getEnv(): EnvContext {
  const allowedOrigins = Netlify.env.get('VITE_APP_URL');
  const connectionString = Netlify.env.get('DATABASE_URL');

  if (!allowedOrigins) throw Error('[getEnv] missing VITE_APP_URL');
  if (!connectionString) throw Error('[getEnv] missing DATABASE_URL');

  return { allowedOrigins, connectionString } as const;
}
