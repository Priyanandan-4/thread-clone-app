import React from 'react';
import Image from 'next/image';
import PLUS from '../../public/img/plus.svg'
 

interface PostBtnProps {

    onClick: () => void;

}

 

const PostBtn: React.FC<PostBtnProps> = ({ onClick }) => {

    return (
<>
    <button onClick={onClick}   className='h-9 mr-3 w-16   bg-[#181818] text-white border border-[#2d2d2d] rounded-lg '> Post</button>
</>

    );

};

 

export default PostBtn;  