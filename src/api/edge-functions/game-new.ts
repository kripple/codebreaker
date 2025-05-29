import { getNewGame } from '@/api/handlers/getNewGame';
import { getDb } from '@/api/helpers/getDb';
import { getEnv } from '@/api/helpers/getEnv';
import { getGame } from '@/api/helpers/getGame';
import { respondWith } from '@/api/helpers/respondWith';

export default async function handler(request: Request) {
  try {
    const env = getEnv();
    if (request.method === 'OPTIONS') return respondWith('options', { env });

    const db = getDb(env);

    const data = await getNewGame({ db });
    const game = getGame(data);

    return respondWith('data', {
      env,
      data: game,
    });
  } catch (error) {
    console.error('Unexpected error in /game/new', error);
    return respondWith('error');
  }
}
