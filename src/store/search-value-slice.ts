import { createSlice } from '@reduxjs/toolkit';

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: '',
  reducers: {
    // setSearchValue: (state, action) => {
    //   return action.payload;
    // },
    // handleChange: (state, action) => {
    //   state.searchValue = event.target.value;
    // },
  },
});
// export const { setSearchValue } = searchValueSlice.actions;
