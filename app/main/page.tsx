'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchUser } from '@/store/reducer/userSlice';
import { fetchPosts, addPost } from '@/store/reducer/postsSlice';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const { posts } = useAppSelector((state) => state.posts);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUserName] = useState<string>('');
    const [postContent, setPostContent] = useState<string>('');
    const [postImage, setPostImage] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setCurrentUser(user);
                setUserName(user.username || '');
            }
        }
    }, [users]);

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

    const handlePostSubmit = async () => {
        if (postContent.trim() === '') {
            alert('Please write something before posting!');
            return;
        }
        if (!currentUser) {
            alert('User not found! Please log in.');
            return;
        }
        const newPost = {
            userId: currentUser._id,
            text: postContent,
            image: postImage,
        };

        dispatch(addPost(newPost)); // Ensure you use the correct action creator
        setPostContent('');
        setPostImage(null); // Reset the image after posting
        setPreview(null); // Reset the preview after posting
        closeModal(); // Close the modal after posting
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#0a0a0a] ">
            <div className='sticky top-0 bg-[#0a0a0a] w-full text-center py-3 z-50'>
                <div className="text-1xl font-bold">For you</div>
            </div>
            <div className="bg-[#181818] sticky rounded-3xl p-4 w-full max-w-xl">
                <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
                    <div className="flex items-center">
                        <img
                            src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="ml-2">What's new?</span>
                    </div>
                    <button
                        onClick={openModal}
                        className="bg-blue-600 text-white rounded px-4 py-2"
                    >
                        Post
                    </button>
                </div>

                {isModalOpen && (
                    <div className="mb-4">
                        <div className="flex items-center mb-4">
                            <img
                                src={currentUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt="profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <p className="ml-2 text-lg">{username}</p>
                        </div>
                        <textarea
                            name="thread"
                            id="thread"
                            placeholder="Write a post"
                            value={postContent}
                            onChange={handlePostChange}
                            className="w-full h-24 p-2 bg-gray-800 text-white rounded mb-2"
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="w-full h-auto mb-2 rounded" />
                        )}
                        <div className="flex items-center mb-4">
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer text-blue-600">
                                Upload Image
                            </label>
                        </div>
                        <button
                            className="bg-blue-600 text-white rounded px-4 py-2"
                            onClick={handlePostSubmit}
                        >
                            Post
                        </button>
                    </div>
                )}

                <div className="flex flex-col mt-4">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-[#181818] rounded-lg p-4 mb-4 border-b border-gray-600">
                            <div className="flex items-center mb-2">
                                <img
                                    src={post.postById?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-2">
                                    <p className="font-semibold">{post.postById.username}</p>
                                    <span className="text-gray-400 text-sm">{post.createdOn}</span>
                                </div>
                            </div>
                            <p className="mb-2">{post.text}</p>
                            {post.image && <img src={post.image} alt="post" className="rounded mb-2" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
