"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/API/axiosinstance";
import Link from "next/link";

export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

 
  const signup = async (userData: UserData) => {
    try {
      const response = await axiosInstance.post('/users/signup', userData);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;  
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email.includes('@')) {
      setError("Please enter a valid email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!name || !username || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }
    const userData: UserData = { name, username, email, password, phone };
    setLoading(true);
    const res = await signup(userData);
    setLoading(false);

    if (res) {
      router.push('/login');  
    } else {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mt-5">
        <h2 className="text-lg font-semibold text-center mb-4 text-white">Create your Account</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
          />
          <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
          />
          <input
            name="phone"
            placeholder="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
          />
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#201d1d] rounded-xl w-full px-3 py-3 mt-2 placeholder-white text-white"
          />
          <button
            type="submit"
            className="bg-white rounded-xl w-full px-3 py-3 mt-2 text-black"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <Link href="/login">
            <button
              type="button"
              className="bg-transparent rounded-xl w-full px-3 py-3 mt-2 text-white"
            >
              You already have an account?
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
