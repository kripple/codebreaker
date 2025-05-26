import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { getGameById } from '@/api/handlers/getGameById';
import { getGame } from '@/api/helpers/getGame';

export async function handler(request: Request) {
  try {
    const sql = neon(Netlify.env.get('DATABASE_URL')!);
    const db = drizzle({ client: sql });

    const url = new URL(request.url);
    const parts = url.pathname.split('/');
    const id = parts[2]; // /game/:id

    const data = await getGameById({ db, id });
    const game = getGame(data);

    return new Response(JSON.stringify(game), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error in /game/:id', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
