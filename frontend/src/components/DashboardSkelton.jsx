import React from "react";

function DashboardSkelton() {
  return (
    <div className="p-6 animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Stats Boxes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mb-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="h-5 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>

      {/* Bar Chart Skeleton */}
      <div className="mt-6 w-full max-w-4xl mx-auto">
        <div className="h-[300px] sm:h-[400px] bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}// components/UserOrderSkeleton.js
export function UserOrderSkeleton() {
  const skeletonCount = 4; 

  return (
    <section className="py-6 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Mobile View Skeleton */}
        <div className="space-y-4 md:hidden">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div key={idx} className="bg-white p-4 shadow rounded-lg space-y-2 animate-pulse">
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-4 w-44 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Desktop View Skeleton */}
        <div className="hidden md:block">
          <div className="overflow-hidden bg-white shadow rounded-lg">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">View</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: skeletonCount }).map((_, idx) => (
                  <tr key={idx} className="border-t animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-4 mx-auto bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-200 rounded mx-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-gray-200 rounded mx-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-12 bg-gray-200 rounded mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}




export const OrderDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 animate-pulse">
      <div className="h-6 w-48 bg-gray-300 rounded mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
          <div className="h-5 w-32 bg-gray-400 rounded" />
        </div>
        <div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
          <div className="h-5 w-32 bg-gray-400 rounded" />
        </div>
        <div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
          <div className="h-5 w-24 bg-gray-400 rounded" />
        </div>
      </div>

      <div className="h-4 w-40 bg-gray-300 rounded mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array(4)
          .fill()
          .map((_, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
          ))}
      </div>
    </div>
  );
};


export const UserReviewsSkeleton = () => {
  const skeletonArray = new Array(3).fill(null);

  return (
    <div className="py-10 px-4">
      <div className="h-8 w-40 bg-gray-200 rounded mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skeletonArray.map((_, index) => (
          <div key={index} className="bg-white border rounded-xl p-5 animate-pulse space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center bg-gray-100 border-dashed border-2 border-gray-300 rounded-xl p-6 animate-pulse">
          <div className="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};



export function UserPaymentsSkeleton() {
  const skeletonCount = 4;

  return (
    <div className="py-6 px-4">
      <div className="h-7 w-40 bg-gray-200 rounded mb-6 animate-pulse"></div> 

      <div className="mb-5 h-6 w-32 bg-gray-200 rounded animate-pulse"></div> 
      <ul className="space-y-6">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <li key={idx} className="space-y-2">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>

            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div> 
            <div className="flex space-x-4 items-center">
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div> 
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div> 
            </div>

            <hr className="border-gray-300" />
          </li>
        ))}
      </ul>
    </div>
  );
}



export default DashboardSkelton;
