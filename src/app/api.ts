import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  // TODO: use env vars to set the correct url
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
  endpoints: (build) => ({
    getFeedback: build.query<
      {
        code: string;
        feedback: string;
      },
      string
    >({
      query: (code: string) => `/try/${code}`,
    }),
  }),
});
