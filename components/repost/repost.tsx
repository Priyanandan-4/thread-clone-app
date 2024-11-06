'use client';
import React, { useState } from 'react';
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
   const [error,setError] = useState< string | null>(null)
    const handleRepost = async () => {
        setError(null);

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
        } catch (err : any) {
            const errorMessage = err.response?.data?.message || "failed"
            setError(errorMessage);
            console.error("Failed to repost:", err);
        }
    };

    if (!isRepostOpen) return null;

    return (
        <div 
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" 
            onClick={() => dispatch(closeRepost())}
        >
            
            <div className="bg-[#181818] p-4 rounded-lg w-40 text-center relative" onClick={(e) => e.stopPropagation()}>
            {error && <p className='text-red-700'>{error}</p>}
                <button 
                    className="bg-[#2d2d2d] text-white px-4 py-2 rounded hover:bg-white hover:text-[#181818]" 
                    onClick={handleRepost}
                >
                    Repost
                </button>
            </div>
        </div>
    );
};

export default Repost;
