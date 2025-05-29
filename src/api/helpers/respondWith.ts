const optionsHeaders = (allowedOrigins: string) =>
  ({
    'Access-Control-Allow-Origin': allowedOrigins,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }) as const;
const headers = (allowedOrigins: string) =>
  ({
    ...optionsHeaders(allowedOrigins),
    'Content-Type': 'application/json',
  }) as const;

export function respondWith(
  key: 'options' | 'error',
  options: { allowedOrigins: string },
): Response;
export function respondWith<T extends object>(
  key: 'data',
  options: { allowedOrigins: string; data: T },
): Response;
export function respondWith<T extends object>(
  key: 'options' | 'error' | 'data',
  { allowedOrigins, data }: { allowedOrigins: string; data?: T },
) {
  // Handle preflight OPTIONS requests
  if (key === 'options') {
    return new Response(null, {
      status: 204,
      headers: optionsHeaders(allowedOrigins),
    });
  }

  if (key === 'data' && data !== undefined) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: headers(allowedOrigins),
    });
  }

  if (key === 'data' && data === undefined) console.error('data is missing');
  if (key !== 'error') console.error(`invalid key '${key}'`);
  return new Response('Internal Server Error', {
    status: 500,
    headers: headers(allowedOrigins),
  });
}
