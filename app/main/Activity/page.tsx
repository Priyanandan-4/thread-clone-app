
import React from 'react';

import axiosInstance from '@/API/axiosinstance';
import ProfileImage from '@/components/profile/profileimage';
import { getUserId } from '@/API/cookie/getCookies';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Notification {
    _id: string;
    description: string;
    senderUserId: User;
}

async function getNotifications() {
    const userId = getUserId();
    const res = await axiosInstance.get(`/users/notification/${userId}`);
    return res.data.notifications;
}

export default async function ActivityPage() {
    let notifications: Notification[] = [];
    try {
        notifications = await getNotifications();
        console.log(notifications)
    } catch (error) {
        console.error(error);

    }

    return (
        <div>
            <div className="h-[60px] flex  items-center justify-center w-[640px] text-white text-xl bg-black fixed  top-0 z-10">Activity</div>
            <div className='bg-[#181818] w-[640px]   border border-[#2d2d2d] mt-[60px] h-screen rounded-2xl fixed no-scrollbar overflow-y-auto '>
                <div className='ml-3 py-2 '>
              {notifications.length === 0 ? (
                    <p>No notifications available...</p>
              ) : (
               
                notifications.map((notification) => (
                    <div key={notification._id} className="border-b border-[#383939] py-4">
                        <div className="flex items-center">
                            <div className="">
                                <ProfileImage 
                                    profilePic={notification.senderUserId.profilePic}
                                    altText="profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-start ml-2">
                                <div className="text-white">{notification.senderUserId.name}</div>
                                <div className="text-neutral-400 ">{notification.description}</div>
                            </div>
                        </div>
                    </div>
               ) ))}
            </div>
            </div>
        </div>
    );
};
