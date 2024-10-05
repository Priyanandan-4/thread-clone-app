'use client'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "@/store/reducer/postsSlice"; 
import { AppDispatch, RootState } from "@/store/store"; 

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status } = useSelector((state: RootState) => state.posts);

  
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
       
        <div className="flex items-center mb-4">
          <h2 className="text-white text-lg mr-3">What's New</h2>
          <button className=" text-white py-2 text-sm px-4 border border-zinc-300 rounded-lg   bg-transparent ">
            Post
          </button>
        </div>

      
        {status === "succeeded" && (
          <div>
            {posts.map((post: any, index: number) => (
              <div key={post._id} className="p-4 mb-4 text-white rounded-lg">
                <div className="flex items-center">
                  <img
                    src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    className="w-10 h-10 rounded-full mr-3"
                    alt="User Profile"
                  />
                  <p>{post.postById?.username || "Unknown User"}</p>
                </div>

               
                <p className="mt-2">{post.text}</p>

               
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="mt-2 rounded-lg object-cover w-full max-h-[500px]" 
                  />
                )}

                {/*Gray line immediately after the post image or text */}
                <hr className="border-t border-gray-600 my-4 opacity-50 w-full" />
              </div>
            ))}
          </div>
        )}
        {status === "failed" && <p className="text-white">Failed to load posts.</p>}
      </div>
    </div>
  );
};

export default Page;
