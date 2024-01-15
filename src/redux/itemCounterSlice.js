import { createSlice } from "@reduxjs/toolkit";

const itemCounterSlice = createSlice({
  name: "counter",
  initialState: 1,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const {increment, decrement} = itemCounterSlice.actions;
export default itemCounterSlice.reducer;