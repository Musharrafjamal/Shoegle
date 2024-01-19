import { createSlice } from "@reduxjs/toolkit";

const arrayOfId = createSlice({
  name: "arrayOfId",
  initialState: {
    myArray: [],
  },
  reducers: {
    updateArray: (state, action) => {
      state.myArray = action.payload;
    },
  },
});

export const { updateArray } = arrayOfId.actions;
export default arrayOfId.reducer;
