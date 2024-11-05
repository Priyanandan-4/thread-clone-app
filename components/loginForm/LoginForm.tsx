 'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { loginUser } from '@/app/(auth)/login/page';
import { setCookie } from '@/API/cookie/setCookies';
import Link from 'next/link';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await loginUser({ username, password });

        if (user && user._id) {
            const userID = user._id;
            await setCookie(userID); 
            router.push('/main');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5 bg-transparent p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-center mb-4 text-white">Log in with your Instagram account</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)}  
                    className="bg-[#201d1d] appearance-none rounded-xl w-full block px-3 py-3 mt-2 placeholder-gray-500 text-white"
                    aria-label="Username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-gray-500 text-white"
                    aria-label="Password"
                />

            
                <button
                    type="submit"
                    className="bg-white rounded-xl block w-full px-3 py-3 mt-2 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
                >
                    Log in
                </button>
                <div className="flex items-center justify-center mt-4">
              <div className="w-full h-px bg-gray-400"></div>
              <p className="px-2 text-gray-400 text-sm">or</p>
              <div className="w-full h-px bg-gray-400"></div>
            </div>

            <Link href="/signup">
              <button className="bg-transparent rounded-xl block w-full px-3 py-3 mt-2 text-white">
                Sign up
              </button>
            </Link>
        
            </form>
        </div>
    );
};

export default LoginForm;
