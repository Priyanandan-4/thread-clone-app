import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    isCommentModalOpen: boolean;
    isCommentOpen: boolean;
    isRepostOpen: boolean;
}

const initialState: ModalState = {
    isCommentModalOpen: false,
    isCommentOpen: false,
    isRepostOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state) {
            state.isCommentModalOpen = true;
        },
        closeModal(state) {
            state.isCommentModalOpen = false;
        },
        openComment(state) {
            state.isCommentOpen = true;
        },
        closeComment(state) {
            state.isCommentOpen = false;
        },
        openRepost(state) {
            state.isRepostOpen = true;
        },
        closeRepost(state) {
            state.isRepostOpen = false;
        },
    },
});

export const { 
    openModal, 
    closeModal, 
    openComment, 
    closeComment, 
    openRepost, 
    closeRepost 
} = modalSlice.actions;

export default modalSlice.reducer;