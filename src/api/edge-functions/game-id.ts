import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'urlpattern-polyfill';

import { getGameById } from '@/api/handlers/getGameById';
import { getGame } from '@/api/helpers/getGame';
import { respondWith } from '@/api/helpers/respondWith';

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS') return respondWith('options');
    const sql = neon(Netlify.env.get('DATABASE_URL')!);
    const db = drizzle({ client: sql });

    const pattern = new URLPattern({ pathname: '/game/:id' });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    if (!id) throw Error('missing id');

    const data = await getGameById({ db, id });
    const game = getGame(data);

    return respondWith('data', game);
  } catch (error) {
    console.error('Unexpected error in /game/:id', error);
    return respondWith('error');
  }
}
