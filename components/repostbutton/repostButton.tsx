'use client';
import React from 'react';
// import { Icons } from '@/ui/Icons/users';
import { BiRepost } from 'react-icons/bi';
// import { useAppDispatch } from '@/lib/hooks';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
// import { openRepost } from '@/store/modalSlice';
import { openRepost } from '@/store/reducer/modalSlice';

interface RepostButtonProps {
    repostCount: number;
    setPostId: (postId: string) => void;
    postId: string;
}

const RepostButton: React.FC<RepostButtonProps> = ({ repostCount, postId, setPostId }) => {
    const dispatch = useAppDispatch();

    return (
        <button 
            className="flex items-center gap-1 text-white bg-transparent border-none cursor-pointer p-0 m-0"
            onClick={() => { 
                dispatch(openRepost()); 
                setPostId(postId); 
            }}
        >
            <BiRepost
            style={{ fontSize: '26px' }}/>
            <span>{repostCount}</span>
        </button>
    );
};

export default RepostButton;
