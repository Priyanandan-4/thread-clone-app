import Profile from '@/components/profile/profile'
import React from 'react'


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <h1 className="h-[60px] flex items-center justify-center text-white text-xl bg-transparent z-[1000]">
                Profile
            </h1>
      <div className='bg-[#181818] rounded-3xl h-screen fixed w-[640px] border border-[#2d2d2d] no-scrollbar overflow-y-auto'>
      <Profile/>
      {children}   
      </div>
    </div>
  )
}

export default Layout
