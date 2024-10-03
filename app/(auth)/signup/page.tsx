"use client";
import { useRouter } from 'next/navigation';
import { Formik,Field,Form,ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

const Signup: React.FC = () => {
  const router = useRouter();

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
      .oneOf([Yup.ref('password'), ], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // Handle form submission
    console.log(values);
    // You can also navigate to another page after signup
    // router.push('/some-other-page');
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-transparent p-6 rounded-lg shadow-lg w-3/12 mt-5">
          <h2 className="text-lg font-semibold text-center mb-4 text-white">Create your Account</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <Field
                  name="name"
                  placeholder="Name"
                  className="bg-[#201d1d] appearance-none rounded-xl w-full block px-3 py-3 mt-2 placeholder-white text-white"
                />
                <ErrorMessage name="name" component="div" className="text-[#181818]" />

                <Field
                  name="username"
                  placeholder="Username"
                  className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-white text-white"
                />
                <ErrorMessage name="username" component="div" className="text-gray-500" />

                <Field
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-white text-white"
                />
                <ErrorMessage name="email" component="div" className="text-gray-500" />

                <Field
                  name="phone"
                  placeholder="Phone"
                  type="tel"
                  className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-white text-white"
                />
                <ErrorMessage name="phone" component="div" className="text-gray-500" />

                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-white text-white"
                />
                <ErrorMessage name="password" component="div" className="text-gray-500" />

                <Field
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  className="bg-[#201d1d] appearance-none rounded-xl block w-full px-3 py-3 mt-2 placeholder-white text-white"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-gray-500" />

                <button type="submit" className="bg-white rounded-xl block w-full px-3 py-3 mt-2 text-black">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
