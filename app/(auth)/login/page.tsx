import Image from 'next/image';
import BG from '../../../public/img/bg.webp';
import LoginForm from '@/components/loginForm/LoginForm';
import axiosInstance from '@/API/axiosinstance';
 
export const loginUser = async (userData: { username: string; password: string }) => {
       
  try {
      const res = await axiosInstance.post('/users/login', userData);


      return res.data;
  } catch (error) {
      console.log(error);
       
  }  
};


const Login: React.FC = () => {
 
  
   

   
  return (
    <div className="relative w-full h-screen">
      <Image 
        src={BG}
        alt="background"
        objectFit="cover"
        className="absolute inset-0 z-[-1] w-full"
      />
      <LoginForm/>
    </div>
  );
};

export default Login;