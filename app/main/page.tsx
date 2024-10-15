'use client'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "@/store/reducer/postsSlice"; 
import { AppDispatch, RootState } from "@/store/store"; 
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import CommentModal from "@/components/commentmodal/CommentModal"; 
import { useAppSelector } from "../hooks/useAppDispatch";

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status } = useSelector((state: RootState) => state.posts);
  const { user } = useAppSelector((state) => state.login);
  
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleCommentSubmit = (comment: string) => {
    // Dispatch action to add comment to the current post
    console.log(`Comment on post ${currentPostId}: ${comment}`);
    // Add your logic here (e.g., dispatch an action to add the comment)
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 flex items-center justify-center bg-black text-white">
        foryou
      </div>
      <div className="h-screen bg-[#181818] p-4 rounded-lg overflow-auto scrollbar-hide">
        <div className="flex items-center mb-4">
          {user && (
            <>
              <h2 className="text-white text-lg mr-3">What's New</h2>
              <button className="text-white py-2 text-sm px-4 border border-zinc-300 rounded-lg bg-transparent">
                Post
              </button>
            </>
          )}
        </div>

        {status === "succeeded" && (
          <div>
            {posts.map((post: any) => (
              <div key={post._id} className="text-white mb-4">
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
                  <div className="flex items-center">
                    <CiHeart style={{ fontSize: "26px" }} />
                  </div>
                  <div className="flex items-center">
                    <FaRegComment
                      style={{ fontSize: "26px", cursor: "pointer" }}
                      onClick={() => {
                        setCurrentPostId(post._id);
                        setCommentModalOpen(true);
                      }}
                    />
                  </div>
                </div>
                <hr className="border-t border-gray-600 my-4 opacity-50 w-full" />
              </div>
            ))}
          </div>
        )}
        {status === "failed" && <p className="text-white">Failed to load posts.</p>}
      </div>
      
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setCommentModalOpen(false)}
        onComment={handleCommentSubmit}
      />
    </div>
  );
};

export default Page;
