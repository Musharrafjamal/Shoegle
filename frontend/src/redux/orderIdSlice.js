import { createSlice } from "@reduxjs/toolkit";

const orderId = createSlice({
  name: "orderId",
  initialState: "",
  reducers: {
    updateOrderId: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateOrderId } = orderId.actions;
export default orderId.reducer;