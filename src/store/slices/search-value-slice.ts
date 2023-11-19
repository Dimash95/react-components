import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: localStorage.getItem('Searched anime') || '',
  reducers: {
    setSearchValue: (state, action) => {
      return action.payload;
    },
  },
});

export const selectSearchValue = (state: RootState) => state.searchValue;

export const { setSearchValue } = searchValueSlice.actions;
