import React from 'react'
import USERPROFILE from '@/components/userProfile/UserProfile'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="h-16 flex items-center justify-center bg-red-600 text-white fixed top-0 w-[640px]">
        Profile
      </div>
      <div className='top-0'>
      <USERPROFILE />
      </div>
      <div className="mt-16"> {/* This margin ensures content does not go under the fixed header */}
        
        {children}
      </div>
    </div>
  )
}

export default Layout
