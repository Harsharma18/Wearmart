import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from "../../assets/banner.png"; 

const Banner = () => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-xl gap-6 p-6 h-full grid grid-cols-1 md:grid-cols-2 justify-center items-center max-w-3xl  ">
      
      {/* Left Section (Text) */}
      <div  className="max-w-lg text-center md:text-left flex flex-col items-center md:items-start justify-center ">

        <h4 className="uppercase text-gray-600 text-lg font-semibold">UP TO <span >30% OFF</span></h4>
        <h1 className="text-4xl font-bold text-gray-800">Men's Classic Fashion</h1>
        <p className="text-gray-700 mt-4">
          Elevate your wardrobe with premium suits, coats, and formal attire. 
          Discover the perfect blend of style and sophistication with our exclusive collection.
        </p>
        <Link to="/shop">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            EXPLORE NOW
          </button>
        </Link>
      </div>

      {/* Right Section (Image) */}
      <div className="flex justify-center md:justify-end">
        <img 
          src={bannerImg} 
          alt="Fashion Banner" 
          className="w-full md:w-[80%] h-auto object-contain rounded-lg shadow-lg"
        />
      </div>

    </div>
  );
};

export default Banner;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import bannerImg from "../../assets/banner.png"; // Update with actual image

// const Banner = () => {
//   return (
//     <div className="bg-gray-100 p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-6 h-full">
      
//       {/* Text Content */}
//       <div className="max-w-lg text-center md:text-left">
//         <h4 className="uppercase text-gray-600 text-lg font-semibold">UP TO 30% OFF</h4>
//         <h1 className="text-4xl font-bold text-gray-800">Men's Classic Fashion</h1>
//         <p className="text-gray-700 mt-4">
//           Elevate your wardrobe with premium suits, coats, and formal attire. 
//           Discover the perfect blend of style and sophistication with our exclusive collection.
//         </p>
//         <Link to="/shop">
//           <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
//             EXPLORE NOW
//           </button>
//         </Link>
//       </div>

//       {/* Image */}
//       <div className="w-full md:w-1/2 h-full flex items-center">
//         <img src={bannerImg} alt="Fashion Banner" className="w-full h-full object-contain rounded-lg shadow-lg" />
//       </div>

//     </div>
//   );
// };

// export default Banner;
