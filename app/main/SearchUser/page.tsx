'use client';
import axiosInstance from '@/API/axiosinstance';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

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
            <h1 className="h-[60px] flex  items-center justify-center w-[640px] text-white text-xl bg-black fixed  top-0 z-10">
                Search
            </h1>
            <div className="mt-[60px] h-screen bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d]">
              <div>
                <CiSearch/>
                <input type="text" className='w-[607px] bg-black h-11 rounded-xl border border-[#2d2d2d] mt-1'/>

                </div>
                 {/* <div className="flex  w-[607px]  h-11  items-center bg-black border-[#2d2d2d]p-2 rounded-xl mb-4 ">
                    <CiSearch />
                    <input
                        type="text"
                        placeholder="Search"
                        // className="flex-grow border-none bg-transparent outline-none text-lg text-gray-300 px-2"
                    />
                </div> */}
                <div className='mt-2 text-[#727272] font-bold'>Follow suggestions</div>
                {users.map((user) => (
                    <div key={user._id} className="flex items-center mb-2 mt-6">
                        
                        <img
                            src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="profile"
                            className='w-10 h-10 rounded-full object-cover mr-3'
                        />
                        <div className="text-white">{user.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Searchpage;
