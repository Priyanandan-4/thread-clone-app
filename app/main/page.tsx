"use client";
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
import Reply from "@/components/commentmodal/CommentModal";
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
      <div className="h-16 flex items-center justify-center bg-black text-white">
        for you
      </div>

      <div className="h-screen bg-[#181818] p-4 rounded-t-lg no-scrollbar overflow-y-auto border-2 border-[#2d2d2d]">
        <Reply
          isOpen={isCommentModalOpen}
          onClose={() => setCommentModalOpen(false)}
          postId={currentPostId || ""}
          userProfilePic={user.profilePic}
          userId={user._id }
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
            <p className="font-bold">{user.username || "Unknown User"}</p>
          </div>
          <PostBtn onClick={() => setIsModalOpen(true)} />
        </div>

        <hr className="border-t border-gray-600 my-4 opacity-50 w-full" />

        {status === "loading" ? (
          <p className="text-gray-400">Loading posts...</p>
        ) : status === "failed" ? (
          <p className="text-red-500">Failed to load posts.</p>
        ) : (
          posts.map((post: any) => (
            <div key={post._id} className="text-white mb-4 mt-5">
              <div className="flex items-center">
                <img
                  src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  alt="User Profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{post.postById?.username || "Unknown User"}</p>
                  <p className="text-gray-400 text-sm">
                    <TimeAgo time={post.createdOn} />
                  </p>
                </div>
              </div>
              <p className="mt-2">{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-2 rounded-lg object-cover max-h-[400px]"
                />
              )}
              <div className="mt-3 flex space-x-4">
                <LikeButton
                  initialLike={post.likes.length}
                  postId={post._id}
                  userId={user?._id}
                  likedUsers={post.likes}
                />
                <FaRegComment
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setCurrentPostId(post._id);
                    setCommentModalOpen(true);
                  }}
                />
              </div>
              <hr className="border-t border-gray-600 my-4 opacity-50 w-full" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
