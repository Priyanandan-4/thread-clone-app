import React from 'react';
import THREAD from '../../public/img//thread-logo-w (1).svg';
import USER from '../../public/img/user.svg'
import HOME from '../../public/img/home.svg'
import HEART from '../../public/img/heart-gray.svg'
import SGRAY from '../../public/img/search-gray.svg'
import PLUS from '../../public/img/plus.svg'
import Image from 'next/image';
import Link from 'next/link';


const SideBar = () => {
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
            <Image
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
          
          </div>
        </div>
    </div>
  )
}

export default  SideBar