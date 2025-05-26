import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { makeAttempt } from '@/api/handlers/makeAttempt';

export default async function handler(request: Request) {
  try {
    const sql = neon(Netlify.env.get('DATABASE_URL')!);
    const db = drizzle({ client: sql });

    const url = new URL(request.url);
    const parts = url.pathname.split('/');

    const id = parts[2]; // /game/:id/try/:code
    const code = parts[4];

    const result = await makeAttempt({ db, id, attempt: code });

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error in /game/:id/try/:code', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
