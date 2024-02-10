import { createSlice } from "@reduxjs/toolkit";

const backendUrlSlice = createSlice({
  name: "backendUrlSlice",
  initialState: "http://localhost:8000",
  reducers: {
    updateBackendUrl: (state, action) => {
      return action.payload; // Assuming the payload is the new URL
    },
  },
});

export const { updateBackendUrl } = backendUrlSlice.actions;
export default backendUrlSlice.reducer;
// https://shoegle-production.up.railway.app
// http://localhost:8000