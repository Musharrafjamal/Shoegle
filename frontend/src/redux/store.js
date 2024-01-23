import { configureStore } from "@reduxjs/toolkit";
import arrayOfId from "./arrayOfId";
import itemCounterReducer from "./itemCounterSlice";
import backendUrlSlice from "./backendUrlSlice";

const store = configureStore({
  reducer: {
    counter: itemCounterReducer,
    arrayOfId,
    backendUrlSlice
  },
});

export default store;
