
import React  from 'react'
// import CMT from '../../public/img/comment.svg'
import { FaRegComment } from 'react-icons/fa6'
 interface replyButtonProps {
  replyCount: number
}
 
const ReplyButton: React.FC<replyButtonProps> = ({replyCount}) => {
  return (
    <button>
      <span>{replyCount}</span>
      <FaRegComment/>
    </button>   
  )
}

export default ReplyButton