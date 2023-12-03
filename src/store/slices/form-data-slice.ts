import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Form } from '../../types/form';

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: [] as Form[],
  reducers: {
    setFormData: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const selectFormData = (state: RootState) => state.formData;

export const { setFormData } = formDataSlice.actions;
