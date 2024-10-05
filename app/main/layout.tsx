'use client'

import SideBar from '@/components/SideBar/sideBar';
import Link from 'next/link';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { logoutUser } from '@/store/reducer/loginSlice'; 

function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.login);

 
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('userId');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">

      <div className="fixed left-0 top-0 h-full flex items-center">
        <SideBar />
      </div>


      <div className="w-[640px] h-auto bg-black rounded border-slate-600">
        {children}
      </div>

     
      {user ? (
         
        <Link href="/Auth">
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 flex justify-center items-center text-black text-sm py-2 px-4 rounded-lg bg-white hover:text-black h-8"
          >

            Logout
          </button>
        </Link>
      ) : (
        // If the user is not logged in, show Login button
        <Link href='/Auth'>
          <button className="absolute top-4 right-4 flex justify-center items-center text-black text-sm py-2 px-4 rounded-lg bg-white hover:text-black h-8">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default Layout;
