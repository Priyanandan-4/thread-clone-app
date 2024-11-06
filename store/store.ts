import { configureStore } from "@reduxjs/toolkit";
 
import postsReducer from "./reducer/postsSlice";
import userSlice from "./reducer/userSlice";

import modalSlice from './reducer/modalSlice'




export const store=configureStore({
    reducer:{
        users:userSlice,
        posts:postsReducer,
        modal:modalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
