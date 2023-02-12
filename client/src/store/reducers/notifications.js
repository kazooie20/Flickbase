import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        global: {}
    },
    reducers: {
        errorGlobal: (state,action) => {
            state.global.error = true;
            state.global.msg = action.payload
        },
        successGlobal: (state,action) => {
            state.global.success = true;
            state.global.msg = action.payload
        },
        clearNotifications: (state) => {
            state.global = {} 

        }
        
    }
})

export const { errorGlobal, successGlobal, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
