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
    const pattern = new URLPattern({ pathname: '/game/:id/try/:code' });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    const code = result?.pathname.groups?.code;
    if (!id || !code) throw Error('missing required params');

    const data = await makeAttempt({ db, id, attempt: code });
    return respondWith('data', { env, data });
  } catch (error) {
    console.error('Unexpected error in /game/:id/try/:code', error);

    return respondWith('error');
  }
}
