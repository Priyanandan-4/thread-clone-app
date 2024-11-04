'use client';
import React from 'react';
// import axiosInstance from '@/axios/axiosInstance';

// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { closeRepost } from '@/store/modalSlice';
// import { fetchPosts } from '@/store/postsSlice';
import axiosInstance from '@/API/axiosinstance';
import { closeRepost } from '@/store/reducer/modalSlice';
import { fetchPosts } from '@/store/reducer/postsSlice';
import { useAppDispatch,useAppSelector } from '@/app/hooks/useAppDispatch';




interface RepostProps {
    postId: string;
    userProfilePic: string;
    username: string;
}

const Repost: React.FC<RepostProps> = ({ postId, userProfilePic, username }) => {
    const dispatch = useAppDispatch();
    const isRepostOpen = useAppSelector((state) => state.modal.isRepostOpen);

    const handleRepost = async () => {
        const userId = localStorage.getItem('userId');
        const repost = {
            userId: userId,
            userProfilePic: userProfilePic,
            username: username,
        };

        try {
            await axiosInstance.post(`/posts/repost/${postId}`, repost);
            dispatch(closeRepost());
            dispatch(fetchPosts());
        } catch (err) {
            console.error("Failed to repost:", err);
        }
    };

    if (!isRepostOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" 
            onClick={() => dispatch(closeRepost())}
        >
            <div className="bg-[#0A0A0A] p-4 rounded-lg w-40 text-center relative" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="bg-[#181818] text-white px-4 py-2 rounded hover:bg-white hover:text-[#181818]" 
                    onClick={handleRepost}
                >
                    Repost
                </button>
            </div>
        </div>
    );
};

export default Repost;
