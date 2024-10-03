import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducer/loginSlice";
import postsReducer from "./reducer/postsSlice";
import userSlice from "./reducer/userSlice";


export const store=configureStore({
    reducer:{
        users:userSlice,
        posts:postsReducer,
        login:loginSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
