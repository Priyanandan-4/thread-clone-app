import axiosInstance from "@/API/axiosinstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
 


interface signUpdetails {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    confirmPassword: string;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState : signUpdetails = {
    name:'',
    username: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: '',
    status: "idle" ,
    error:  null
}

export const signupUser = createAsyncThunk('signup/signupUser',
    async (userData : {name :string; username: string; email: string; password: string; phone: string},{rejectWithValue})=>{
        try{
            const response = await  axiosInstance.post('/users/signup', userData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
        
    }
)

 const signupSlice = createSlice({
    name:'signupUser',
    initialState,
    reducers:{
        setName: (state, action) => {
            state.name = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.status = 'succeeded';
                
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },

})

export default signupSlice.reducer;

export const {setName, setUsername, setEmail, setPassword, setPhone, setConfirmPassword}= signupSlice.actions
