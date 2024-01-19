import { configureStore } from "@reduxjs/toolkit";
import arrayOfId from "./arrayOfId";
import itemCounterReducer from "./itemCounterSlice";

const store = configureStore({
  reducer: {
    counter: itemCounterReducer,
    arrayOfId,
  },
});

export default store;
