import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: {},
    reducers: {
        updateName: (state, action) => {
            return action.payload;
        }
    }
})
export const {updateName} = userSlice.actions;
export default userSlice.reducer;