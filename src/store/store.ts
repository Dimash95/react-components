import { configureStore } from '@reduxjs/toolkit';
import { searchValueSlice } from './slices/search-value-slice';
import { itemsPerPageSlice } from './slices/items-per-page-slice';
import { animeApi } from '../services/anime-api';
import { detailAnimeApi } from '../services/detailed-anime-api';

export const store = configureStore({
  reducer: {
    searchValue: searchValueSlice.reducer,
    itemsPerPage: itemsPerPageSlice.reducer,
    [animeApi.reducerPath]: animeApi.reducer,
    [detailAnimeApi.reducerPath]: detailAnimeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animeApi.middleware,
      detailAnimeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
