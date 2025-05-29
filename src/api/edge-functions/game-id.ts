import { getGameById } from '@/api/handlers/getGameById';
import { getDb } from '@/api/helpers/getDb';
import { getEnv } from '@/api/helpers/getEnv';
import { getGame } from '@/api/helpers/getGame';
import { respondWith } from '@/api/helpers/respondWith';

import 'urlpattern-polyfill';

export default async function handler(request: Request) {
  try {
    const env = getEnv();
    if (request.method === 'OPTIONS') return respondWith('options', { env });

    const db = getDb(env);
    const pattern = new URLPattern({ pathname: '/game/:id' });
    const result = pattern.exec(request.url);
    const id = result?.pathname.groups?.id;
    if (!id) throw Error('missing id');

    const data = await getGameById({ db, id });
    const game = getGame(data);

    return respondWith('data', {
      env,
      data: game,
    });
  } catch (error) {
    console.error('Unexpected error in /game/:id', error);
    return respondWith('error');
  }
}
