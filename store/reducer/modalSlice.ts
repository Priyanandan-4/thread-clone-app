import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
 
    isRepostOpen: boolean;
}

const initialState: ModalState = {
    isRepostOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openRepost(state) {
            state.isRepostOpen = true;
        },
        closeRepost(state) {
            state.isRepostOpen = false;
        },
    },
});

export const {  
    openRepost, 
    closeRepost 
} = modalSlice.actions;

export default modalSlice.reducer;