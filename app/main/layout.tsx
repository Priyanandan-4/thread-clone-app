
'use client'
import React from 'react';
import SideBar from '@/components/SideBar/sideBar';
import { useAppDispatch,useAppSelector } from '../hooks/useAppDispatch';



function Layout({ children }: { children: React.ReactNode }) {
  
  const { user } = useAppSelector((state) => state.login); 
 

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      {/* Sidebar Fixed on the Left */}
      <div className="fixed left-0 top-0 h-full flex items-center">
      <SideBar />
      </div>

      {/* Main ContentCentered */}
      <div className="w-[640px] h-auto bg-black rounded border-slate-600">
        {children}

      </div>
    </div>
  );
}

export default Layout;
