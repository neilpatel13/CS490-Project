import { createSlice } from '@reduxjs/toolkit';

export const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    value: false,
  },
  reducers: {
    toggleRefresh: state => {
      state.value = !state.value;
    },
  },
});

export const { toggleRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;