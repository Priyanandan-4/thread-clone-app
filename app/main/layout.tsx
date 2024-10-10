import React, { ReactNode } from 'react';
import SideBar from '@/components/SideBar/sideBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex'}}>
     <div style={{display:'flex', position:'fixed'}}><SideBar/></div> 
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;