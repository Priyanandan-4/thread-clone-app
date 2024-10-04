"use client";
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from '@/app/hooks/useAppDispatch';
import { setName, setUsername, setEmail, setPhone, setPassword, setConfirmPassword, signupUser } from '@/store/reducer/signupSlice';
import { RootState } from "@/store/store";
import { useEffect } from 'react';

const Signup: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state: RootState) => state.Signup);

  const initialValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

  const handleSubmit = (values: typeof initialValues) => {
    // Dispatch individual actions to update the form state
    dispatch(setName(values.name));
    dispatch(setUsername(values.username));
    dispatch(setEmail(values.email));
    dispatch(setPhone(values.phone));
    dispatch(setPassword(values.password));
    dispatch(setConfirmPassword(values.confirmPassword));

    // Dispatch the signupUser action with the necessary values
    dispatch(signupUser({ 
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password 
    }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      router.push('/login');
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5">
        <h2 className="text-lg font-semibold text-center mb-4 text-white">Create your Account</h2>
        {status === 'loading' && <p className="text-center text-white">Signing up...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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

              <button type="submit" className="bg-white rounded-xl w-full px-3 py-3 mt-2 text-black" disabled={status === 'loading'}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
