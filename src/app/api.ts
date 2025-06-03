import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Game } from '@/types/game';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Game'],
  endpoints: (build) => ({
    getGame: build.query<Game & { date: string }, string>({
      query: (id: string) => `/game/${id}`,
      providesTags: ['Game'],
    }),
    makeAttempt: build.mutation<
      { id: string },
      { id: string; attempt: string; order: number }
    >({
      query: ({ id, attempt, order }) => ({
        method: 'POST',
        url: `/game/${id}/turn/${order}/try/${attempt}`,
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});
