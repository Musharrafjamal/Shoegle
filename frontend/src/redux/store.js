import { configureStore } from "@reduxjs/toolkit";
import arrayOfId from "./arrayOfId";
import itemCounterReducer from "./itemCounterSlice";
import backendUrlSlice from "./backendUrlSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    counter: itemCounterReducer,
    arrayOfId,
    backendUrlSlice,
    userSlice,
  },
});

export default store;
