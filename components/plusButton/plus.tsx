import React from 'react';
import Image from 'next/image';
import PLUS from '../../public/img/plus.svg'


interface PostBtnProps {

    onClick: () => void;

}



const PlusBtn: React.FC<PostBtnProps> = ({ onClick }) => {

    return (
        <>  <button>
                <Image
                    src={PLUS}
                    alt='search'
                    height={22}
                    width={22}

                    onClick={onClick}
                    className='m-5 mt-10 '
                />
            </button>
        </>
    );

};



export default PlusBtn;  