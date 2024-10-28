import Profile from '@/components/profile/profile'
import React from 'react'


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
      <Profile/>
      </div>
      <div className='top-0'>
     
      </div>
      <div className="mt-16"> {/* This margin ensures content does not go under the fixed header */}
        
        {children}
      </div>
    </div>
  )
}

export default Layout
