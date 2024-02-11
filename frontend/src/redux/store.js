import { configureStore } from "@reduxjs/toolkit";
import arrayOfId from "./arrayOfId";
import itemCounterReducer from "./itemCounterSlice";
import backendUrlSlice from "./backendUrlSlice";
import userSlice from "./userSlice";
import orderIdSlice from "./orderIdSlice";

const store = configureStore({
  reducer: {
    counter: itemCounterReducer,
    arrayOfId,
    backendUrlSlice,
    userSlice,
    orderId: orderIdSlice,
  },
});

export default store;
