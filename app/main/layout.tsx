'use client'

import SideBar from '@/components/SideBar/sideBar';
import Link from 'next/link';
import React from 'react';
import { useAppDispatch,useAppSelector } from '../hooks/useAppDispatch';
// import { useAppSelector,useAppDispatch } from '../fonts/hooks/useAppDispatch';
import { logoutUser } from '@/store/reducer/loginSlice'; // Import your logout action

function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.login); // Get the user from the login slice

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logout action
    localStorage.removeItem('userId'); // Clear user ID from localStorage
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      {/* Sidebar Fixed on the Left */}
      <div className="fixed left-0 top-0 h-full flex items-center">
        <SideBar />
      </div>

      {/* Main Content Centered */}
      <div className="w-[640px] h-auto bg-black rounded border-slate-600">
        {children}
      </div>

      {/* Conditionally Render Login or Logout Button */}
      {user ? (
        // If the user is logged in, show Logout button
        <Link href="/login">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 flex justify-center items-center text-black text-sm py-2 px-4 rounded-lg bg-white hover:text-black h-8"
        >

          Logout
        </button>
        </Link>
      ) : (
        // If the user is not logged in, show Login button
        <Link href='/login'>
          <button className="absolute top-4 right-4 flex justify-center items-center text-black text-sm py-2 px-4 rounded-lg bg-white hover:text-black h-8">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default Layout;
