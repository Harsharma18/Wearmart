// src/components/ShopPageSkeleton.jsx
import React from 'react';

const ShopPageSkeleton = () => {
  return (
    <div className="container mx-auto w-full md:w-[70%] p-6 mt-4">
      {/* Header Skeleton */}
      <div className="w-full shadow-lg rounded-xl h-60 bg-gray-100 flex flex-col justify-center items-center text-center px-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-3 gap-2 md:grid-cols-4 w-full items-start">
        {/* Filter Sidebar Skeleton */}
        <div className="hidden md:block md:col-span-1 p-2 h-1/3">
          <div className="bg-white p-4 rounded-lg shadow animate-pulse">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="space-y-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-3 bg-gray-200 rounded w-2/3"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="md:col-span-3 p-2">
          {/* Mobile Filter Button Skeleton */}
          <div className="md:hidden h-10 bg-gray-200 rounded-md mb-4 animate-pulse"></div>

          {/* Product Grid Skeleton */}
          <div className="grid p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white p-2 rounded-xl shadow-lg flex flex-col items-center animate-pulse"
              >
                <div className="w-full h-[300px] bg-gray-200 rounded-2xl"></div>
                <div className="p-4 w-full space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPageSkeleton;