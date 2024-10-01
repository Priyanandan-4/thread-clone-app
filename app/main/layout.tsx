import SideBar from '@/components/SideBar/sideBar';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            {/* Sidebar Fixed on the Left */}
            <div className="fixed left-0 top-0 h-full flex items-center">
                <SideBar />
            </div>

            {/* Main Content Centered */}
            <div className="w-[640px] h-auto bg-black  rounded border-slate-600"> {/* Adjust margin-left based on the width of SideBar */}
                {children}
            </div>
        </div>
    );
}

export default Layout;
