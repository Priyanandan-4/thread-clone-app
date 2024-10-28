'use client'
import axiosInstance from '@/API/axiosinstance';
import React, { useEffect, useState } from 'react';

interface User {
    _id: string;
    followers: string[];
    profilePic?: string;
    name: string;
}

const Searchpage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axiosInstance.get('/users');
                setUsers(res.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users. Please try again later.');
            }
        };
        getUsers();
    }, []);

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <h1 className="h-[60px] flex items-center justify-center text-white text-xl bg-transparent z-[1000] ">
                Search
            </h1>
                <div className="h-screen bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border-2 border-[#2d2d2d]">
            {users.map((user) => (
                <div key={user._id} className=" flex w-20">
                    <img
                        src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="profile"
                        className=' w-10 h-10 rounded-full object-cover mr-3'
                    />
                    <div>{user.name}</div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Searchpage;
