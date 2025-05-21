import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { AttemptReply, Reply } from '@/types/reply';

export const api = createApi({
  // TODO: use env vars to set the correct url
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000',
  }),
  tagTypes: ['Game'],
  endpoints: (build) => ({
    getGame: build.query<Reply, string>({
      query: (id: string) => `/game/${id}`,
      providesTags: ['Game'],
    }),
    makeAttempt: build.mutation<AttemptReply, { id: string; attempt: string }>({
      query: ({ id, attempt }) => `/game/${id}/try/${attempt}`,
      invalidatesTags: ['Game'],
    }),
  }),
});
