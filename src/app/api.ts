import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  // TODO: use env vars to set the correct url
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000',
  }),
  endpoints: (build) => ({
    getGame: build.query<{ id: string }, string>({
      query: (id: string) => `/game/${id}`,
    }),
  }),
});
