import React, { useState } from 'react';

const DocumentUpload = ({ onUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = await onUpload(file);
    if (preview) {
      setPreviewImage(`${process.env.REACT_APP_API_URL}/api/preview/${preview}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="px-4 py-2 bg-chatBg text-text border border-border rounded-lg cursor-pointer transition-all hover:border-primary hover:shadow-glow">
        Upload Document
        <input 
          type="file" 
          accept=".pdf,.png,.jpg,.jpeg" 
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {previewImage && (
        <div className="max-w-[200px] max-h-[200px] rounded-lg overflow-hidden glow-border">
          <img src={previewImage} alt="Document preview" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;