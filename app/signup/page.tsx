import React from 'react'

const Page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-transparent p-6 rounded-lg shadow-lg w-3/12 mt-5">
          <h2 className="text-lg font-semibold text-center mb-4 text-white">Create your Account</h2> 

          <input
            type="text"
            placeholder="Name"
            className="bg-[#201d1d] appearance-none rounded-xl w-full block px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
          <input
            type="password"
            placeholder="Username"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="password"
            placeholder="Email"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="password"
            placeholder="phone"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="password"
            placeholder="password"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="password"
            placeholder="Confirm Password"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
          <button className="bg-white rounded-xl block w-full px-3 py-3 mt-2 text-black">
            Sign Up
          </button>

          
          </div>
          </div>
          </div>
          
       
         
  )
}

export default Page
