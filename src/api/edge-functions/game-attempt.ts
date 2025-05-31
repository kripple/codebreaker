import { makeAttempt } from '@/api/handlers/makeAttempt';
import { getDb } from '@/api/helpers/getDb';
import { getEnv } from '@/api/helpers/getEnv';
import { respondWith } from '@/api/helpers/respondWith';

import 'urlpattern-polyfill';

export default async function handler(request: Request) {
  try {
    const env = getEnv();
    if (request.method === 'OPTIONS') return respondWith('options', { env });

    const db = getDb(env);
    const pattern = new URLPattern({
      pathname: '/game/:id/turn/:order/try/:code',
    });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    const order = result?.pathname.groups?.order;
    const code = result?.pathname.groups?.code;
    if (!id || !order || !code) throw Error('missing required params');

    const data = await makeAttempt({ db, id, attempt: code, order });
    return respondWith('data', { env, data });
  } catch (error) {
    const env = getEnv({ allowUndefined: true });
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      error.message === '409'
    ) {
      return respondWith('conflict', { env });
    } else {
      console.error(
        'Unexpected error in /game/:id/turn/:order/try/:code',
        error,
      );
      return respondWith('error', { env });
    }
  }
}
