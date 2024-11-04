import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./reducer/loginSlice";
import postsReducer from "./reducer/postsSlice";
import userSlice from "./reducer/userSlice";
import signupSlice from "./reducer/signupSlice";
import modalSlice from './reducer/modalSlice'




export const store=configureStore({
    reducer:{
        users:userSlice,
        posts:postsReducer,
        login:loginSlice,
        Signup:signupSlice,
        modal:modalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
