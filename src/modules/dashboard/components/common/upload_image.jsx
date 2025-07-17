import React, { useRef } from "react";

export const UploadImage = ({ onImageUpload, isSaving = false }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3 mt-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        disabled={isSaving}
        className={`
          w-full h-24 border-2 border-dashed border-gray-300 
          rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200
          flex flex-col items-center justify-center gap-2
          ${
            isSaving
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-blue-400"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
      >
        {isSaving ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Guardando...</span>
          </>
        ) : (
          <>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Subir imagen
            </span>
          </>
        )}
      </button>
    </div>
  );
};
