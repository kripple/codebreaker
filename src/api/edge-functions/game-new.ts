import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { getNewGame } from '@/api/handlers/getNewGame';
import { getGame } from '@/api/helpers/getGame';

export async function handler(_request: Request) {
  try {
    const sql = neon(Netlify.env.get('DATABASE_URL')!);
    const db = drizzle({ client: sql });

    const data = await getNewGame({ db });
    const game = getGame(data);
    return new Response(JSON.stringify(game), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error in /game/new', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
