import React from 'react';
import Customcarousel from './Customcarousel';
import Banner from './Banner';
import amazon from "../../assets/amazon.png";
import zara from "../../assets/zara.jpg";
import woocommerce from "../../assets/woocommerce.png";
import sitepoint from "../../assets/sitepoint.png";
import myntra from "../../assets/myntra.jpg";
import hm from "../../assets/hm.png";
import bewkoof from "../../assets/bewkoof.png";
import Categories from './Categories';
import Trendingproduct from '../Shops/Trendingproduct';
import Promobanner from './Promobanner';
import Blogs from '../Blogs/Blogs';

function Home() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center p-2  ">
                
                <Banner/>
               
                <div className="hidden md:block h-full">
                    <Customcarousel />
                </div>
            </div>
            <Animationlogo />
            <Categories/>
            <Trendingproduct/>
            <Promobanner/>
            <Blogs/>
        </>
    );
}

export default Home;



function Animationlogo() {
    const logos = [amazon, bewkoof, hm, myntra, zara, sitepoint, woocommerce, amazon, bewkoof, hm, myntra, zara, sitepoint, woocommerce];

    return (
        <div className="w-full container py-3 flex flex-col  items-center">
          
          <div className="w-auto px-6 py-3  shadow-md rounded-lg text-gray-700 text-lg font-semibold text-center border-l-4 border-blue-500 mb-4">
        Proud Partner of <span className="text-blue-600">WearMart</span> <br /> 
        in Collaboration with <span className="text-green-600">HubSpot & Segment</span>
    </div>
            <div className="relative w-full overflow-hidden">
                <div className="flex animate-marquee space-x-12 min-w-full">
                    {logos.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Company Logo ${index + 1}`}
                            className="h-12 md:h-18 w-36 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}






// import React from 'react';
// import CustomCarousel from './CustomCarousel';
// import Banner from './Banner';

// function Home() {
//   return (
//     <div className="container mx-auto px-6 py-12">
//       <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-12">
        
//         {/* Left Side: Banner */}
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="w-full max-w-lg h-[500px] flex items-center">
//             <Banner />
//           </div>
//         </div>

//         {/* Right Side: Carousel */}
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="w-full max-w-lg h-[500px] flex items-center">
//             <CustomCarousel />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Home;
