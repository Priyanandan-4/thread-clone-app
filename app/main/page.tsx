import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* 'foryou' div - fixed at the top */}
      <div className="h-16 flex items-center justify-center bg-black text-white">
        foryou
      </div>

      {/* Main content div that scrolls */}
      <div className="flex-grow bg-[#181818] p-4 rounded-lg flex items-center justify-center overflow-y-auto">
        {/* Main content goes here */}
       
      </div>
    </div>
  );
}

export default Page;
