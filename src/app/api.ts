import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type GameData = {
  id: string;
  attempts: {
    value: string;
    feedback: string;
  }[];
};

type ApiResponse<Data> =
  | { data: Data; error?: never }
  | { data?: never; error: unknown };

export const api = createApi({
  // TODO: use env vars to set the correct url
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000',
  }),
  tagTypes: ['Game'],
  endpoints: (build) => ({
    getGame: build.query<ApiResponse<GameData>, string>({
      query: (id: string) => `/game/${id}`,
      providesTags: ['Game'],
    }),
    makeAttempt: build.mutation<
      ApiResponse<{ id: string }>,
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
