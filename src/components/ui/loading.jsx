import React from "react";

export const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
};
