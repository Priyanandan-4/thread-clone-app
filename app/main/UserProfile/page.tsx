'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/app/hooks/useAppDispatch";
import { RootState } from "@/store/store";
import axiosInstance from '@/API/axiosinstance';


const UserDetails: React.FC = () => {
  const { posts } = useAppSelector((state: RootState) => state.posts);
 const [post,setPosts]=useState<any>([])
const dispatch=useAppDispatch()

  const {users} = useAppSelector((state : RootState ) =>state.users)

  type post = {
    _id: string;
    userProfilePic: string;
    username: string;
    text: string;
    image: string;
    createdOn: string;
    replies: any[];
    likes: string[];
    reposts: string[];
    postById:string
};





const fetchPosts = async () => {
  try {
      const userId = localStorage.getItem('userId');
      if (userId) {
          const response = await axiosInstance.get(`api/posts/${userId}`);
          setPosts(response.data.post);
      }
  } catch (error) {
      console.error('Error fetching posts:', error);
  }
};

// useEffect(() => {
  
//   dispatch(fetchPosts);
// }, [dispatch]);

  return (
    <>
    <div>
      {posts.map((post) => (
         <img
         src={post.image}
         alt="Post"
         className="max-h-[400px] mt-2 rounded-lg ml-5 max-w-md"
     />
      ))}
      </div>
    </>
  );
};

export default UserDetails;
