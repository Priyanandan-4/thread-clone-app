'use client';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/reducer/postsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { FaRegComment } from "react-icons/fa6";
import { useAppSelector } from "../hooks/useAppDispatch";
import PostBtn from "@/components/postbutton/postBtn";
import Threads from "@/components/threads/postModal";
import LikeButton from "@/components/likeButton/likeButton";
import TimeAgo from "@/components/timeEgo/time";
import Reply from "@/components/ReplayModal/replymodal";
import { fetchUser } from "@/store/reducer/userSlice";

const Page: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, status } = useSelector((state: RootState) => state.posts);
    const { users } = useAppSelector((state: RootState) => state.users);
    
    const [user, setUser] = useState<any>([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommentModalOpen, setCommentModalOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const foundUser = users.find((user) => user._id === userId);
            setUser(foundUser);
        }
    }, [users]);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className="flex flex-col h-screen">
            <div className="h-[60px] text-xl flex items-center justify-center bg-black text-white">
                For you
            </div>

            <div className="h-screen bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d]">
                <Reply
                    isOpen={isCommentModalOpen}
                    onClose={() => setCommentModalOpen(false)}
                    postId={currentPostId || ""}
                    userProfilePic={user.profilePic}
                    userId={user._id}
                    username={user.username}
                />

                <Threads isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-white">Create a new post</h2>
                </Threads>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <img
                            src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            alt="User Profile"
                        />
                        <p className="text-[#777777]">What's new?</p>
                    </div>
                    <PostBtn onClick={() => setIsModalOpen(true)} />
                </div>

                <hr className="border-t border-[#2d2d2d] my-4 w-full" />

                
                    {posts.map((post) => (
                        <div key={post._id} className="text-white mb-4">
                            <div className="flex items-center">
                                <img
                                    src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                    alt="User Profile"
                                />
                                <div>
                                    <div className="flex flex-row items-center">
                                        <p className="font-bold mt-2">{post.postById.username || "Unknown User"}</p>
                                        <p className="text-gray-400 ml-2 mt-2 text-xs">
                                            <TimeAgo time={post.createdOn} />
                                        </p>
                                    </div>
                                    <p className="mt-2">{post.text}</p>
                                </div>
                            </div>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="max-h-[400px] mt-2 rounded-lg ml-5 max-w-md"
                                />
                            )}
                            <div className="mt-3 ml-5 flex space-x-4 items-center">
                                <LikeButton
                                    initialLike={post.likes.length}
                                    postId={post._id}
                                    userId={user?._id}
                                    likedUsers={post.likes}
                                />
                                <div className="flex items-center">
                                    <FaRegComment  style={{ fontSize: '18px' }}
                                        // className="text-2xl cursor-pointer "
                                        onClick={() => {
                                            setCurrentPostId(post._id);
                                            setCommentModalOpen(true);
                                        }}
                                    />
                                    {post.replies && (
                                        <span className="ml-1 ">
                                            {post.replies.length} 
                                        </span>
                                    )}
                                </div>
                            </div>
                            <hr className="border-t border-[#2d2d2d] my-4 w-full" />
                        </div>
                        
                    ))
                }
            </div>
        </div>
    );
};

export default Page;
