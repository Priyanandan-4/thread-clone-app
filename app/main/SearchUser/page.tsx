// 'use client';
// import axiosInstance from '@/API/axiosinstance';
// import Followbtn from '@/components/follow/followbtn';
// import React, { useEffect, useState } from 'react';
// import { CiSearch } from 'react-icons/ci';

// interface User {
//     _id: string;
//     followers: string[];
//     profilePic?: string;
//     name: string;
    
// }

// const Searchpage: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [filteredUsers, setFilteredUsers] = useState(users);

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const res = await axiosInstance.get('/users');
//                 setUsers(res.data.users);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//                 setError('Failed to load users. Please try again later.');
//             }
//         };
//         getUsers();
//     }, []);



//     return (
//         <div>
//             {error && <div className="error-message">{error}</div>}
//             <h1 className="h-[60px] flex  items-center justify-center w-[640px] text-white text-xl bg-black fixed  top-0 z-10">
//                 Search
//             </h1>
//             <div className="mt-[60px] h-screen bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d]">
//               <div>
//                 <CiSearch/>
//                 <input type="text" className='w-[607px] bg-black h-11 rounded-xl border border-[#2d2d2d] mt-1'/>

//                 </div>
                 
//                 <div className='mt-2 text-[#727272] font-bold'>Follow suggestions</div>
//                 {users.map((user) => (
//                     <div key={user._id} className="flex items-center mb-2 mt-6">
                        
//                         <img
//                             src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                             alt="profile"
//                             className='w-10 h-10 rounded-full object-cover mr-3'
//                         />
//                         <div className="text-white">{user.name}</div>
//                     </div>
                    
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Searchpage;
'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch,useAppSelector } from '@/app/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducer/userSlice';
import Followbtn from '@/components/follow/followbtn';
import { CiSearch } from 'react-icons/ci';
import ProfileImage from '@/components/profile/profileimage';



const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && users.length > 0) {
            const user = users.find((user) => user._id === userId);
            if (user) {
                setCurrentUser(user);
            }
        }
    }, [users]);

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
        
        <h1 className="h-[60px] flex  items-center justify-center w-[640px] text-white text-xl bg-black fixed  top-0 z-10">
                 Search
            </h1>


          
            <div className="mt-[60px] h-screen bg-[#181818] p-4 rounded-t-3xl no-scrollbar overflow-y-auto border border-[#2d2d2d] w-[640px]">
                <div className="relative mb-4">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="flex-grow outline-none text-lg text-gray-300 px-10 py-2 bg-black border border-[#2d2d2d] rounded-2xl w-[607px]"
                    />
                </div>

              
                <div >
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user._id} className="bg-[#181818] rounded-lg p-4 shadow-md flex items-center justify-between">
                            
                                <div className="flex items-center">
                                    <ProfileImage
                                        profilePic={user.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                        altText="profile"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="ml-2">
                                        <p className="font-bold text-white">{user.name}</p>
                                        <p className="text-sm text-gray-400">{user.username}</p>
                                        <p className="text-sm text-gray-500">{user.followers.length} followers</p>
                                        
                                    </div>
                                     
                                </div>
                                 
                                 
                              
                                 
                               
                                {currentUser && currentUser._id !== user._id && (
                                    <Followbtn userId={user._id}/>
                                    
                                )}
                             
                            </div>
                            
                        ))
                    ) : (
                        <p className="text-gray-400">No user found</p>
                    )}
                    
                </div>
                
            </div>
        </div>
    );
};

export default SearchPage;