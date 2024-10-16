
import React, { useState } from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComment: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, onComment }) => {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComment(comment);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#181818] p-4 rounded-lg">
        <h2 className="text-gray-600">Add a Comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border-s rounded bg-[#181818]"
            required
          />
          <button type="submit" className="mt-2 px-4 py-2 rounded bg-black text-white">
            Submit
          </button>
          <button type="button" onClick={onClose} className="ml-5 mt-2 px-4 py-2 rounded bg-black text-white">Close</button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
