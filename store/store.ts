import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducer/loginSlice";
import postsReducer from "./reducer/postsSlice";


export const store=configureStore({
    reducer:{
        users:loginSlice,
        posts:postsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
