"use client";
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full py-12">
      <div className="animate-pulse flex space-x-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading; 