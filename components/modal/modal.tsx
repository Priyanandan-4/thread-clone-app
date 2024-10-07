import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
}

const UploadModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onUpload(image);
    onClose(); // Close modal after uploading
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#181818] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        />
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
  