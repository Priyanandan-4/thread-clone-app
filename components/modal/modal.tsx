// import React, { useState } from 'react';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onUpload: (file: File | null, content: string) => void;
//   user: any; // User information (profile pic, username)
// }

// const UploadModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpload, user }) => {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [content, setContent] = useState(''); // State to handle post content

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null; // Safely retrieve the file
//     if (file) {
//       setImage(file);  // Set the file to state
//       setPreview(URL.createObjectURL(file));  // Set preview URL for displaying
//     } else {
//       console.error('No file selected'); // Handle the case where no file is selected
//     }
//   };
  

//   const handleSubmit = () => {
//     if (image) {
//       onUpload(image, content); // Pass image and content to parent component
//       onClose(); // Close modal after upload
//     }
//   };

//   if (!isOpen) return null; // Ensure modal only renders when isOpen is true

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-[#181818] rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-lg font-bold mb-4 text-white">Create Post</h2>
        
//         {/* Display user's profile picture and username */}
//         {user && (
//           <div className="flex items-center mb-4">
//             <img
//               src={user.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
//               className="w-10 h-10 rounded-full object-cover mr-3"
//               alt="User Profile"
//             />
//             <p className="text-white">{user.username || 'Unknown User'}</p>
//           </div>
//         )}
        
//         <textarea
//           placeholder="What's on your mind?"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-2 mb-4 text-white bg-[#333333] rounded-md"
//           rows={4}
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mb-4 w-full p-2 border border-gray-300 rounded-md"
//         />

//         {preview && (
//           <div className="mb-4">
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-full h-40 object-cover rounded-md"
//             />
//           </div>
//         )}

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadModal;
