export function respondWith(key: 'options' | 'error'): Response;
export function respondWith<T extends object>(key: 'data', data: T): Response;
export function respondWith<T extends object>(
  key: 'options' | 'error' | 'data',
  data?: T,
) {
  // Handle preflight OPTIONS request
  if (key === 'options') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': import.meta.env.VITE_APP_URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (key === 'data' && data !== undefined) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': import.meta.env.VITE_APP_URL,
      },
    });
  }

  if (key === 'data' && data === undefined) console.error('data is missing');
  if (key !== 'error') console.error(`invalid key '${key}'`);
  return new Response('Internal Server Error', { status: 500 });
}
