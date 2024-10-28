import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchUser = createAsyncThunk("user/ fetchUser", async () =>{

    const response = await axios.get("https://social-media-rest-apis.onrender.com/api/users/")
    return response.data.users;
}) 

interface Userstate  {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;

}

interface User{
    _id:string;
    name: string;
    followers: string[];
    following: string[];
    email: string;
    username: string;
    profilePic: string;
    bio:string;
}

 const initialState : Userstate={
    users:[],
    status:"idle",
    error:null
 }

 const loginSlice = createSlice({
    name : "users",
    initialState,
    reducers :{},
    extraReducers : (builder) => {

        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message ?? null;
            });

 }
})

export default loginSlice.reducer;