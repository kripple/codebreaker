import { makeAttempt } from '@/api/handlers/makeAttempt';
import { getAllowedOrigins } from '@/api/helpers/getAllowedOrigins';
import { getDb } from '@/api/helpers/getDb';
import { respondWith } from '@/api/helpers/respondWith';

import 'urlpattern-polyfill';

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS')
      return respondWith('options', { allowedOrigins: getAllowedOrigins() });

    const db = await getDb();
    const pattern = new URLPattern({ pathname: '/game/:id/try/:code' });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    const code = result?.pathname.groups?.code;
    if (!id || !code) throw Error('missing required params');

    const data = await makeAttempt({ db, id, attempt: code });
    return respondWith('data', { allowedOrigins: getAllowedOrigins(), data });
  } catch (error) {
    console.error('Unexpected error in /game/:id/try/:code', error);
    return respondWith('error', { allowedOrigins: getAllowedOrigins() });
  }
}
