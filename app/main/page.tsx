'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/reducer/postsSlice"; // Import fetchPosts thunk
import { AppDispatch, RootState } from "@/store/store"; // Import AppDispatch and RootState from your store

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for dispatch typing

  // Select posts and status from the Redux store
  const { posts, status } = useSelector((state: RootState) => state.posts);

  // Fetch posts on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts()); // Dispatch the fetchPosts thunk action
    }
  }, [dispatch, status]);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 flex items-center justify-center bg-black text-white">
        foryou
      </div>
      <div className="h-screen bg-[#181818] p-4 rounded-lg overflow-auto scrollbar-hide">
        {status === "succeeded" && (
          <div>
            {posts.map((post: any) => (
              <div key={post._id} className="p-4 mb-4 text-white rounded-lg">
                <p>{post.text}</p>
                {post.image && <img src={post.image} alt="Post" className="mt-2" />}
              </div>
            ))}
          </div>
        )}
        {status === "failed" && <p>Failed to load posts.</p>}
      </div>
    </div>
  );
};

export default Page;
