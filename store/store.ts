import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducer/loginSlice";


const store=configureStore({
    reducer:{
        users:loginSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;