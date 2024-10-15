import React from 'react';
import Image from 'next/image'; // Use Next.js Image for SVG
import COMMENT from '../../public/img/comment.svg'; // Ensure this path is correct

interface CommentProps {
  count: number;
  postId: string;
  onAddComment: (postId: string, comment: string) => void;
}

const Comment: React.FC<CommentProps> = ({ count, postId, onAddComment }) => {
  const handleCommentClick = () => {
    const comment = prompt('Enter your comment'); // For simplicity, using prompt to get user input
    if (comment) {
      onAddComment(postId, comment);
    }
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleCommentClick}>
      <span className="mr-2">{count}</span>
      <Image
        src={COMMENT}
        alt="Comment Icon"
        width={24} // Adjust size as needed
        height={24}
      />
    </div>
  );
};

export default Comment;

