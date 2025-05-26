import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'urlpattern-polyfill';

import { makeAttempt } from '@/api/handlers/makeAttempt';
import { respondWith } from '@/api/helpers/respondWith';

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS') return respondWith('options');
    const sql = neon(Netlify.env.get('DATABASE_URL')!);
    const db = drizzle({ client: sql });

    const pattern = new URLPattern({ pathname: '/game/:id/try/:code' });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    const code = result?.pathname.groups?.code;
    if (!id || !code) throw Error('missing required params');

    const data = await makeAttempt({ db, id, attempt: code });
    return respondWith('data', data);
  } catch (error) {
    console.error('Unexpected error in /game/:id/try/:code', error);
    return respondWith('error');
  }
}
