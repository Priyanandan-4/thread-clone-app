'use client';
import React, { useEffect, useState } from 'react';
import ProfileImage from './profileimage';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducer/userSlice';
import EditProfile from '../editprofile/editProfile';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [name, setName] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [userBio, setUserBio] = useState<string>('');
    const [followers, setFollowers] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setName(user.name || '');
                setUserName(user.username || '');
                setProfilePic(user.profilePic || '');
                setUserBio(user.bio || '');
                setFollowers(user.followers || []);
            }
        }
    }, [users]);

    const handleEditProfileOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleEditProfileClose = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="w-full bg-transparent">
            <EditProfile isOpen={isEditModalOpen} onClose={handleEditProfileClose} />

           

            <div>
                {/* Profile Section */}
                <div className="flex justify-between items-center h-[140px] w-full p-5">
                    <div className="text-white">
                        <h1 className="text-2xl font-semibold mt-10">{name}</h1>
                        <h6 className="text-white text-sm">{username}</h6>
                        <p className="text-white text-sm mt-6">{userBio}</p>
                        <p className="text-white text-sm mt-4">{followers.length} Followers</p>
                    </div>
                    <div className="w-[75px] h-[75px] mr-2.5">
                        <ProfileImage
                            altText="Profile"
                            profilePic={profilePic}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                <div className="bg-[#181818] px-4">
                    <div 
                        className="flex h-9 border border-[#2d2d2d] rounded-2xl p-2.5 cursor-pointer transition-colors justify-center items-center text-sm text-white mt-14"
                        onClick={handleEditProfileOpen}
                    >
                        Edit profile
                    </div>
                </div>

                <div className="flex justify-between items-center p-5">
                    <Link href={'/main/UserProfile'} className="text-[#777777] hover:text-gray-300 transition-colors ">
                        Threads
                    </Link>
                    <Link href={'/main/UserProfile/reply'} className="text-[#777777] hover:text-gray-300 transition-colors">
                        Replies
                    </Link>
                    <Link href={'/main/UserProfile/repost'} className="text-[#777777] hover:text-gray-300 transition-colors">
                        Reposts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
