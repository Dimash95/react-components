import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const itemsPerPageSlice = createSlice({
  name: 'itemsPerPage',
  initialState: 10,
  reducers: {
    setItemsPerPage: (state, action) => {
      return action.payload;
    },
  },
});

export const selectItemsPerPage = (state: RootState) => state.itemsPerPage;

export const { setItemsPerPage } = itemsPerPageSlice.actions;
