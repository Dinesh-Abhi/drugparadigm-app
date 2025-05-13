import React from 'react';

export const Loader= () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      <span className="ml-2 text-gray-600 dark:text-gray-400">Loading documentation...</span>
    </div>
  );
};