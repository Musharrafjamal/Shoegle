import { configureStore } from "@reduxjs/toolkit"
import itemCounterReducer from "./itemCounterSlice"


const store = configureStore({
    reducer: {
        counter: itemCounterReducer
    }
})

export default store