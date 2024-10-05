'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import BG from '../../public/img/bg.webp'

import { useRouter } from 'next/navigation';
import { loginUser } from '@/store/reducer/loginSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  setName,
  setUsername,
  setEmail,
  setPhone,
  setPassword,
  setConfirmPassword,
  signupUser,
} from '@/store/reducer/signupSlice';
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, status, error } = useAppSelector((state) => state.login);
  const { status: signupStatus } = useAppSelector((state: RootState) => state.Signup);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      const userId = user._id;
      localStorage.setItem('userId', userId);
      router.push('/main');
    }
  }, [status, user, router]);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const initialValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignupSubmit = (values: typeof initialValues) => {
  
    dispatch(setName(values.name));
    dispatch(setUsername(values.username));
    dispatch(setEmail(values.email));
    dispatch(setPhone(values.phone));
    dispatch(setPassword(values.password));
    dispatch(setConfirmPassword(values.confirmPassword));

    
    dispatch(signupUser({ 
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password 
    }));
  };

  useEffect(() => {
    if (signupStatus === 'succeeded') {
      setIsLogin(true);
    }
  }, [signupStatus]);

  return (
    <div className="relative w-full h-screen">
      <Image
        src={BG}
        alt="background"
        objectFit="cover"
        className="absolute inset-0 z-[-1] w-full"
      />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-transparent p-6 rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5">
          <h2 className="text-lg font-semibold text-center mb-4 text-white">
            {isLogin ? 'Log in with your Instagram account' : 'Create your Account'}
          </h2>

          {error && <p className="text-center text-red-500">{error}</p>}
          
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="bg-[#201d1d] appearance-none rounded-xl w-full block px-3 py-3 mt-2 placeholder-gray-500 text-white"
                aria-label="Username"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
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
            </form>
          ) : (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSignupSubmit}>
              {() => (
                <Form>
                  <Field
                    name="name"
                    placeholder="Name"
                    className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
                  />
                  <ErrorMessage name="name" component="div" className="text-[#181818]" />
                  
                  <Field
                    name="username"
                    placeholder="Username"
                    className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
                  />
                  <ErrorMessage name="username" component="div" className="text-gray-500" />
                  
                  <Field
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
                  />
                  <ErrorMessage name="email" component="div" className="text-gray-500" />

                  <Field
                    name="phone"
                    placeholder="Phone"
                    type="tel"
                    className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
                  />
                  <ErrorMessage name="phone" component="div" className="text-gray-500" />

                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
                  />
                  <ErrorMessage name="password" component="div" className="text-gray-500" />

                  <Field
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-gray-500" />

                  <button type="submit" className="bg-white rounded-xl w-full px-3 py-3 mt-2 text-black">
                    Sign Up
                  </button>
                </Form>
              )}
            </Formik>
          )}

          <div className="flex items-center justify-center mt-4">
            <div className="w-full h-px bg-gray-400"></div>
            <p className="px-2 text-gray-400 text-sm">or</p>
            <div className="w-full h-px bg-gray-400"></div>
          </div>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="bg-transparent rounded-xl block w-full px-3 py-3 mt-2 text-white"
          >
            {isLogin ? 'Sign up' : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
