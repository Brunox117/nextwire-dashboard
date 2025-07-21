import React, { useRef } from "react";

export const UploadButton = ({
  onUpload,
  isSaving = false,
  message = "Subir archivo",
  accept = "image/*",
  url = "",
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const hasFile = url && url.trim().length > 0;
  const displayMessage = hasFile ? "Cambiar archivo" : message;

  return (
    <div className="space-y-3 mt-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        onClick={handleButtonClick}
        disabled={isSaving}
        className={`
          w-full h-24 border-2 border-dashed rounded-lg transition-all duration-200
          flex flex-col items-center justify-center gap-2
          ${
            hasFile
              ? "border-green-300 bg-green-50 hover:bg-green-100"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }
          ${
            isSaving
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-blue-400"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
      >
        {hasFile ? (
          <>
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-green-700">{displayMessage}</span>
            <span className="text-xs text-gray-500 truncate max-w-full px-2">
              {url}
            </span>
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
            <span className="text-sm font-medium text-gray-700">{displayMessage}</span>
          </>
        )}
      </button>
    </div>
  );
};
