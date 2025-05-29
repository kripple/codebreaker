import { getNewGame } from '@/api/handlers/getNewGame';
import { getAllowedOrigins } from '@/api/helpers/getAllowedOrigins';
import { getDb } from '@/api/helpers/getDb';
import { getGame } from '@/api/helpers/getGame';
import { respondWith } from '@/api/helpers/respondWith';

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS')
      return respondWith('options', { allowedOrigins: getAllowedOrigins() });

    const db = await getDb();

    const data = await getNewGame({ db });
    const game = getGame(data);

    return respondWith('data', {
      allowedOrigins: getAllowedOrigins(),
      data: game,
    });
  } catch (error) {
    console.error('Unexpected error in /game/new', error);
    return respondWith('error', { allowedOrigins: getAllowedOrigins() });
  }
}
