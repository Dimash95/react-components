import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const detailAnimeApi = createApi({
  reducerPath: 'detailAnimeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/anime' }),
  endpoints: (builder) => ({
    getAnimeById: builder.query({
      query: ({ id = 1 }) => `/${id}`,
    }),
  }),
});

export const { useGetAnimeByIdQuery } = detailAnimeApi;
