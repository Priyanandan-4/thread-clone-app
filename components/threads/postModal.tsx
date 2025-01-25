import React, { ReactNode, useState } from 'react';
import PostBtn from '../postbutton/postBtn';
import axiosInstance from '@/API/axiosinstance';
import { useAppDispatch, useAppSelector } from '@/app/hooks/useAppDispatch';
import { fetchPosts } from '@/store/reducer/postsSlice';
import { RootState } from '@/store/store';

interface ThreadsProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Threads: React.FC<ThreadsProps> = ({ isOpen, onClose, children }) => {
  const [postContent, setPostContent] = useState<string>('');
  const [postImage, setPostImage] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();



  const handlePostSubmit = async () => {
    const userId = localStorage.getItem('userid');
    console.log(userId)

   

    if (postContent.trim() === '') {
      alert('Please write something before posting!');
      return;
    }
    if (!userId) {
      alert('User not found! Please log in.');
      return;
    }
    
    const newPostFormData = new FormData();
    newPostFormData.append('userId', userId);  
    newPostFormData.append('text', postContent);
    newPostFormData.append('image', postImage);

    try {
      const res = await axiosInstance.post('/posts', newPostFormData);``
      console.log("this is ", res);
      onClose();  
      dispatch(fetchPosts())
    } catch (error) {
      console.error('Error adding new post:', error);
    }

    setPostContent('');
    setPostImage(null);
    setPreview(null);
  };

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-[1000]">
      <div className="bg-[#181818] p-8 w-[90%] max-w-[500px] rounded-lg shadow-lg relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 transition-colors">
          &times;
        </button>
        <div className="mt-4 text-gray-200">
          {children}
          <div className="flex flex-col gap-4 mt-8">
            <textarea
              placeholder="Write a post"
              value={postContent}
              onChange={handlePostChange}
              className="bg-[#181818] outline-none"
            />
            {preview && (
              <div className="w-full max-h-[300px] overflow-hidden rounded-md">
                <img src={preview} alt="Preview" className="w-full h-auto object-cover rounded-md" />
              </div>
            )}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <label className="flex items-center text-gray-300 cursor-pointer hover:text-white">
                <button className="ml-2 mt-5 border h-10 w-40 rounded-lg">Upload Image</button>
              </label>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <PostBtn onClick={handlePostSubmit} />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Threads;
