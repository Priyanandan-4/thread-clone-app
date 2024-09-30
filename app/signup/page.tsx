import { useRouter } from 'next/router';
import React, { use, useState } from 'react'

const Signup  : React.FC = () => {


  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-transparent p-6 rounded-lg shadow-lg w-3/12 mt-5">
          <h2 className="text-lg font-semibold text-center mb-4 text-white">Create your Account</h2> 
          <form>
          <input
            type="text"
            placeholder="Name"
        
            className="bg-[#201d1d] appearance-none rounded-xl w-full block px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
          <input
            type="username"
            placeholder="Username"

            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="email"
            placeholder="Email"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="phone"
            placeholder="phone"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="password"
            placeholder="password"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
           <input
            type="Confirm password"
            placeholder="Confirm Password"
            className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
          />
          <button className="bg-white rounded-xl block w-full px-3 py-3 mt-2 text-black">
            Sign Up
          </button>
          </form>
          
          </div>
          </div>
          </div>
          
       
         
  )
}

export default Signup
