'use client'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/reducer/postsSlice"; 
import { AppDispatch, RootState } from "@/store/store"; 

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status } = useSelector((state: RootState) => state.posts);

  // Fetch posts on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts()); 
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
                <div className="flex items-center">
                  <img
                    src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <p>{post.postById?.username || "Unknown User"}</p>
                </div>
                <p className="mt-2">{post.text}</p>
                {post.image && <img src={post.image} alt="Post" className="mt-2 rounded-lg" />}
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
