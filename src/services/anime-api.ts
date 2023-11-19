import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetch from 'isomorphic-fetch'; // Импорт функции fetch, совместимой с SSR

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jikan.moe/v4/anime',
    fetchFn: fetch,
  }),

  endpoints: (builder) => ({
    getAnime: builder.query({
      query: ({ pageNumber = 1, itemsPerPage = 10, searchValue = '' }) =>
        `?page=${pageNumber}&sfw&limit=${itemsPerPage}&q=${searchValue}`,
    }),
  }),
});

export const { useGetAnimeQuery } = animeApi;
