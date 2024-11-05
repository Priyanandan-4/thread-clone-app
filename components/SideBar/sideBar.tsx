import React from 'react';
import THREAD from '../../public/img//thread-logo-w (1).svg';
import USER from '../../public/img/user.svg'
import HOME from '../../public/img/home.svg'
import HEART from '../../public/img/heart-gray.svg'
import SGRAY from '../../public/img/search-gray.svg'
import PLUS from '../../public/img/plus.svg'
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/API/cookie/deletecookies';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { openModal } from '@/store/reducer/modalSlice';





const SideBar :React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
      await deleteCookie();
      router.push('/login');
  };

  const toggleDropdown = () => {
      setDropdownOpen(prev => !prev);
  };

  return (
    <div>
        <div className='ml-1 h-screen w-20'>
          <Link href='/main'>
          <Image
          src={THREAD}
          alt='thread'
          height={30}
          width={30}
          className='m-5'
          />
          </Link>
          <div>
          <Link href='/main'>
          <Image
          src={HOME}
          alt='home logo'
          height={25}
          width={25}
          className='m-5 mt-36 BG' 
          />
          </Link>
          <Link href='/main/SearchUser'>
          <Image
          src={SGRAY}
          alt='search'
          height={25}
          width={25}
          
          className='m-5 mt-10 '
          />
          </Link>
            <Image onClick={()=>dispatch(openModal())}
          src={PLUS}
          alt='search'
          height={22}
          width={22}
          
          className='m-5 mt-10 '
          />
          <Link href='/main/Activity'>
            <Image
          src={HEART}
          alt='search'
          height={30}
          width={28}
          
          className='m-5 mt-10'
          />
          </Link>
          <Link href='/main/UserProfile'>
            <Image
          src={USER}
          alt='search'
          height={23}
          width={23}
          
          className='m-5 mt-10 '
          />
          </Link>

           
    
          <HiOutlineMenuAlt2
            className="m-5 mt-48 cursor-pointer"
            size={23}
            onClick={toggleDropdown}
          />
         
          {dropdownOpen && (
            <div>
              <button
                className="absolute  bg-[#2d2d2d] w-24 rounded-2xl bottom-5 bg-transparent p-2.5 z-[101] ml-[80px] mt-[100px]"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          )}
          </div>
        </div>
    </div>
  )
}

export default  SideBar