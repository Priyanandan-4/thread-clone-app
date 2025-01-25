'use client'
import React from 'react'
import { useState } from 'react';
import axiosInstance from '@/API/axiosinstance';
import { useEffect } from 'react';
import TimeAgo from '../timeEgo/time';
import LikeButton from '../likeButton/likeButton';
import { FaRegComment } from 'react-icons/fa6';

function Userpost() {

    
    const [posts, setPosts] = useState<Post[]>([]);

    type Post = {
        _id: string;
        userProfilePic: string;
        username: string;
        text: string;
        image: string;
        createdOn: string;
        replies: Reply[];
        likes: string[];
        reposts: string[];
    };

    type Reply = {
        _id: string;
        userId: string;
        userProfilePic: string;
        username: string;
        text: string;
    };

    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const response = await axiosInstance.get(`/posts/${userId}`);
                setPosts(response.data.post);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
  return (
    <div>
       {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="mb-4">
                        <div className="flex items-center mb-2">
                            <img
                                src={post.userProfilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                                alt="User Profile"
                            />
                            <span className="font-bold">{post.username || "priya_n"}</span>
                            <p className="text-gray-400 ml-2 mt-2 text-xs">
                                <TimeAgo time={post.createdOn} />
                            </p>

                        </div>
                        <div>
                                    <p className="ml-5 ">{post.text}</p>
                                </div>

                        <div>  {post.image && (
                            <img
                                src={post.image}
                                alt="Post"
                                className="max-h-[400px] rounded-lg ml-5 max-w-md"
                            />
                        )}</div>

                       
                        <div className="flex mt-2 ml-5">
                            <LikeButton
                                initialLike={post.likes.length}
                                postId={post._id}
                                likedUsers={post.likes} 
                            />
                            <div className="flex items-center ml-2">
                                <FaRegComment
                                    style={{ fontSize: '18px' }}
                                  
                                />
                                {post.replies.length > 0 && (
                                    <span className="ml-1">
                                        {post.replies.length}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
    </div>
  )
}

export default Userpost
