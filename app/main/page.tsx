'use client';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "@/store/reducer/postsSlice"; 
import { AppDispatch, RootState } from "@/store/store"; 
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import CommentModal from "@/components/commentmodal/CommentModal"; 
import { useAppSelector } from "../hooks/useAppDispatch";
import PostBtn from "@/components/postbutton/postBtn";
import Threads from "@/components/threads/threads"; // Assuming you saved your Threads component

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status } = useSelector((state: RootState) => state.posts);
  const { user } = useAppSelector((state) => state.login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCommentSubmit = (comment: string) => {
    console.log(`Comment on post ${currentPostId}: ${comment}`);
    // Dispatch action to add the comment (implement this in your Redux actions)
  };

  const renderPosts = () => {
    if (status === "succeeded") {
      return posts.map((post: any) => (
        <div key={post._id} className="text-white mb-4 mt-5">
          <div className="flex items-center">
            <img
              src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              className="w-10 h-10 rounded-full object-cover mr-3"
              alt="User Profile"
            />
            <p>{post.postById?.username || "Unknown User"}</p>
          </div>
          <p className="mt-2">{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="mt-2 rounded-lg object-cover max-h-[500px]"
            />
          )}
          <div className="mt-3 flex space-x-4">
            <CiHeart style={{ fontSize: "26px" }} />
            <FaRegComment
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => {
                setCurrentPostId(post._id);
                setCommentModalOpen(true);
              }}
            />
          </div>
          <hr className="border-t border-gray-600 my-4 opacity-50 w-full" />
        </div>
      ));
    }

    return <p className="text-white">Failed to load posts.</p>;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 flex items-center justify-center bg-black text-white">for you</div>
      <div className="h-screen bg-[#181818] p-4 rounded-lg overflow-auto scrollbar-hide">
        <PostBtn onClick={() => setIsModalOpen(true)} />
        {renderPosts()}
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        onComment={handleCommentSubmit}
      />
      <Threads
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-white">Create a new post</h2>
      </Threads>
    </div>
  );
};

export default Page;
