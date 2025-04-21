import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import image1 from "../../assets/buycar.jpeg"
import image2 from "../../assets/shoponlinecar.jpeg"
import image3 from "../../assets/clothescar.jpg"
import image4 from "../../assets/ordercar.jpg"

const images = [image1, image2, image3, image4];

const Customcarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimer(3);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimer(3);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 1 ? prev - 1 : 3)); 
      if (timer === 1) {
        nextSlide(); // Change slide
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="relative w-full md:max-w-[800px] h-[400px] flex  justify-center items-center overflow-hidden bg-gray-200 rounded-lg shadow-lg">
      
      {/* Image */}
      <img src={images[currentIndex]} alt="slide" className="w-full h-full object-cover transition-all duration-500" />
      
      {/* Timer Text */}
      <p className="absolute bottom-4 bg-black/50 text-white px-4 py-1 rounded-lg text-sm">
        Next slide in {timer} sec
      </p>
      
      {/* Left Arrow */}
      <button onClick={prevSlide} className="absolute left-4 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black transition">
        <FaChevronLeft />
      </button>
      
      {/* Right Arrow */}
      <button onClick={nextSlide} className="absolute right-4 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black transition">
        <FaChevronRight />
      </button>
      
    </div>
  );
};

export default Customcarousel;




//witout timer
// import React, { useEffect, useState } from "react";
// import image1 from "../assets/buycar.jpeg"
// import image2 from "../assets/shoponlinecar.jpeg"
// import image3 from "../assets/clothescar.jpg"
// import image4 from "../assets/ordercar.jpg"

// const images = [
//   image1,
//   image2,
//   image3,
//   image4,
// ];

// const CustomCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//    const nextSlide = ()=>{
//     setCurrentIndex((prev)=> ((prev+1 ) % images.length));
//    }
//    const prevSlide = ()=>{
//     setCurrentIndex((prev)=>prev===0?images.length-1:prev-1);
//    }
  
   
  
//   useEffect(()=>{
//     const interval = setInterval(()=>{
//       nextSlide();
//    },3000)
//    return () => clearInterval(interval);
//   },[])
//    //useeffect

  

//   return (
//     <div className="flex flex-col justify-center items-center">
//    <img  className="w-1/2 " src={images[currentIndex]} alt="slide"></img>
   
   
//    <button onClick={prevSlide}>Prev</button>
//    <button onClick={nextSlide}>Next</button>

   
   
//     </div>
//   )
// }

// export default CustomCarousel;