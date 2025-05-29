import { HttpResponse, http } from 'msw';

import { getGameById } from '@/app/mocks/getGameById';
import { makeAttempt } from '@/app/mocks/makeAttempt';
import { isString } from '@/utils/type-guards';

const url = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${url}/game/new`, () => {
    return HttpResponse.json({ id: 'game-id-by-msw' });
  }),

  http.get(`${url}/game/:id`, ({ params }) => {
    const id = params.id;
    if (!isString(id)) throw TypeError(`expected id '${id}' to be a string`);
    return HttpResponse.json(getGameById(id));
  }),

  http.post(`${url}/game/:id/try/:code`, ({ params }) => {
    const id = params.id;
    const code = params.code;
    if (!isString(id) || !isString(code))
      throw TypeError('expected string params');
    return HttpResponse.json(makeAttempt({ id, code }));
  }),
];
