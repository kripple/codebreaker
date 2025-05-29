import type { EnvContext } from '@/api/helpers/getEnv';

export const getOptionsHeaders = (env: EnvContext) =>
  ({
    'Access-Control-Allow-Origin': env.allowedOrigins,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }) as const;

export const getHeaders = (env: EnvContext) =>
  ({
    ...getOptionsHeaders(env),
    'Content-Type': 'application/json',
  }) as const;
