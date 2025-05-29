import { getGameById } from '@/api/handlers/getGameById';
import { getAllowedOrigins } from '@/api/helpers/getAllowedOrigins';
import { getDb } from '@/api/helpers/getDb';
import { getGame } from '@/api/helpers/getGame';
import { respondWith } from '@/api/helpers/respondWith';

import 'urlpattern-polyfill';

export default async function handler(request: Request) {
  try {
    if (request.method === 'OPTIONS')
      return respondWith('options', { allowedOrigins: getAllowedOrigins() });

    const db = await getDb();
    const pattern = new URLPattern({ pathname: '/game/:id' });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    if (!id) throw Error('missing id');

    const data = await getGameById({ db, id });
    const game = getGame(data);

    return respondWith('data', {
      allowedOrigins: getAllowedOrigins(),
      data: game,
    });
  } catch (error) {
    console.error('Unexpected error in /game/:id', error);
    return respondWith('error', { allowedOrigins: getAllowedOrigins() });
  }
}
