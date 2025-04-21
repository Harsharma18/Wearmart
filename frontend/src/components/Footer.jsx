import React from 'react';
import image1 from "../assets/instagram-1.jpg";
import image2 from "../assets/instagram-2.jpg";
import image3 from "../assets/instagram-3.jpg";
import image4 from "../assets/instagram-4.jpg";
import image5 from "../assets/instagram-5.jpg";
import image6 from "../assets/instagram-6.jpg";

function Footer() {
  return (
    <div className='bg-white/30 container mx-auto text-black py-10 px-6'>
      <div className=' grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8 text-center'>
        {/* Contact Info */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-xl font-semibold border-b-2 pb-2 border-red-500'>Contact Info</h4>
          <p className='flex items-center gap-2'><i className='text-red-500 fa-solid fa-location-dot'></i> 123, Sector 53, Gurugram</p>
          <p className='flex items-center gap-2'><i className='text-red-500 fa-solid fa-envelope'></i> support@wearmart.com</p>
          <p className='flex items-center gap-2'><i className='text-red-500 fa-solid fa-phone'></i> (+012) 3456 789</p>
        </div>
        
        {/* Company */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-xl font-semibold border-b-2 pb-2 border-red-500'>Company</h4>
          <a href='/' className='hover:text-red-500 transition duration-300'>Home</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>About Us</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Work With Us</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Our Blogs</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Terms & Conditions</a>
        </div>
        
        {/* Useful Links */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-xl font-semibold border-b-2 pb-2 border-red-500'>Useful Links</h4>
          <a href='/' className='hover:text-red-500 transition duration-300'>Help</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Track Your Order</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Men</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Women</a>
          <a href='/' className='hover:text-red-500 transition duration-300'>Dresses</a>
        </div>
        
        {/* Instagram Section */}
        <div>
          <h4 className='text-xl font-semibold border-b-2 pb-2 border-red-500 mb-3'>Instagram</h4>
          <div className='grid grid-cols-3 gap-2 overflow-hidden'>
            {[image1, image2, image3, image4, image5, image6].map((img, index) => (
              <img key={index} src={img} alt={`Instagram ${index}`} className='w-full h-20 object-cover overflow-hidden rounded-lg hover:scale-110 transition-transform duration-300' />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className='text-center text-gray-400 mt-8 border-t border-gray-700 pt-4'>
        <p>&copy; 2025 WearMart. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;