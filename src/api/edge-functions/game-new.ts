import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { getNewGame } from '@/api/handlers/getNewGame';
import { getGame } from '@/api/helpers/getGame';
import { respondWith } from '@/api/helpers/respondWith';

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS') return respondWith('options');

    const sql = neon(Netlify.env.get('DATABASE_URL')!);
    const db = drizzle({ client: sql });

    const data = await getNewGame({ db });
    const game = getGame(data);

    return respondWith('data', game);
  } catch (error) {
    console.error('Unexpected error in /game/new', error);
    return respondWith('error');
  }
}
