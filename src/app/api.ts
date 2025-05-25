import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Game } from '@/types/game';

export const api = createApi({
  // TODO: use env vars to set the correct url
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000',
  }),
  tagTypes: ['Game'],
  endpoints: (build) => ({
    getGame: build.query<Game, string>({
      query: (id: string) => `/game/${id}`,
      providesTags: ['Game'],
    }),
    makeAttempt: build.mutation<
      { id: string },
      { id: string; attempt: string }
    >({
      query: ({ id, attempt }) => ({
        method: 'POST',
        url: `/game/${id}/try/${attempt}`,
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});
