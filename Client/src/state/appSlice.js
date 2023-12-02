import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  battery: {},
};

export const AppSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    setBattries(st, action) {
      const battery = action.payload;
      st.battery = battery;
    }
  },
});

export const { setBattries } = AppSlice.actions;
