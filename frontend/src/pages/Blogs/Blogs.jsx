import React from "react";
import blogData from "../../data/blogs.json";

function Blogs() {
  return (
    <div className="container mx-auto px-4 py-10 bg-sky-100/10  flex flex-col items-center justify-center text-center">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-gray-900">
          Latest From Blog
        </h2>
        <p className="max-w-md text-gray-500 text-sm mt-2">
          Elevate your wardrobe with our freshest style tips, trends, and inspiration.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  justify-center items-center gap-4">
        {blogData.map((item, index) => (
          <div
            key={index}
            className="bg-white w-[300px] h-[300px]  rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Cropped Image */}
            <div className="w-[300px] h-[200px] object-cover overflow-hidden">
              <img
                className="w-full h-full  transform hover:scale-110 transition duration-300"
                src={item.imageUrl}
                alt={item.title}
              />
            </div>

            {/* Blog Content */}
            <div className="p-3 text-center">
              <h6 className="text-red-600 font-medium text-xs uppercase">{item.subtitle}</h6>
              <h4 className="text-sm font-semibold text-gray-900 mt-1 truncate">{item.title}</h4>
              <p className="text-gray-500 text-xs mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
