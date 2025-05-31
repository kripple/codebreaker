export type EnvContext = { allowedOrigins: string; connectionString: string };

export function getEnv(): EnvContext;
export function getEnv(props: { allowUndefined: boolean }): EnvContext;
export function getEnv(props?: { allowUndefined?: boolean }):
  | EnvContext
  | {
      allowedOrigins: string | undefined;
      connectionString: string | undefined;
    } {
  const allowedOrigins = Netlify.env.get('VITE_APP_URL');
  const connectionString = Netlify.env.get('DATABASE_URL');

  if (props?.allowUndefined) {
    if (!allowedOrigins) console.warn('[getEnv] missing VITE_APP_URL');
    if (!connectionString) console.warn('[getEnv] missing DATABASE_URL');
    return {
      allowedOrigins: allowedOrigins || '',
      connectionString: connectionString || '',
    };
  } else {
    if (!allowedOrigins) throw Error('[getEnv] missing VITE_APP_URL');
    if (!connectionString) throw Error('[getEnv] missing DATABASE_URL');
    return { allowedOrigins, connectionString } as const;
  }
}
