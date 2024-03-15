import { createSlice } from "@reduxjs/toolkit";

const backendUrlSlice = createSlice({
  name: "backendUrlSlice",
  initialState: "https://shoegle-production.up.railway.app",
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