'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BG from '../../public/img/bg.webp';
import { useAppDispatch, useAppSelector } from '../fonts/hooks/useAppDispatch';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/store/reducer/loginSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
 

  const { users } = useAppSelector((state) => state.users);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!email || !password) {
    //   console.error('Email and password are required.');
    //   return;
    // }

    const user = users.find(user => user.email === email); // Assuming username matches email here
    if (user) {
      localStorage.setItem('userId', user._id);
      console.log(user);
      router.push('/main');
    } else {
      console.log('User does not exist, redirect to the signup page');
      router.push('/signup');
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Image
        src={BG}
        alt="background"
        objectFit="cover"
        className="absolute inset-0 z-[-1] w-full"
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-transparent p-6 rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5">
            <h2 className="text-lg font-semibold text-center mb-4 text-white">Log in with your Instagram account</h2>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#201d1d] appearance-none rounded-xl w-full block px-3 py-3 mt-2 placeholder-gray-500 text-white"
              aria-label="Email"
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

            <p className="flex justify-center mt-3 text-gray-600 font-extralight">Forgot password?</p>

            <div className="flex items-center justify-center mt-4">
              <div className="w-full h-px bg-gray-400"></div>
              <p className="px-2 text-gray-400 text-sm">or</p>
              <div className="w-full h-px bg-gray-400"></div>
            </div>

            <button className="bg-transparent rounded-xl block w-full px-3 py-3 mt-2 text-white">
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
