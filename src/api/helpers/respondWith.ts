import type { EnvContext } from '@/api/helpers/getEnv';
import { getHeaders, getOptionsHeaders } from '@/api/helpers/getHeaders';

export function respondWith(key: 'error'): Response;
export function respondWith(
  key: 'options',
  options: { env: EnvContext },
): Response;
export function respondWith<T extends object>(
  key: 'data',
  options: { env: EnvContext; data: T },
): Response;
export function respondWith<T extends object>(
  key: 'options' | 'error' | 'data',
  options?: { env: EnvContext; data?: T },
) {
  if (!options)
    return new Response(null, {
      status: 500,
    });
  const { data, env } = options;
  const optionsHeaders = getOptionsHeaders(env);
  const headers = getHeaders(env);

  // Handle preflight OPTIONS requests
  if (key === 'options') {
    return new Response(null, {
      status: 204,
      headers: optionsHeaders,
    });
  }

  if (key === 'data' && data !== undefined) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers,
    });
  }

  if (key === 'data' && data === undefined) console.error('data is missing');

  if (key !== 'error') console.error(`invalid key '${key}'`);
  return new Response('Internal Server Error', {
    status: 500,
    headers,
  });
}
