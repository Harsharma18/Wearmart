import React from 'react';

function Promobanner() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 justify-center items-center bg-gray-50 py-8 px-4">
      
      
      <div className="flex flex-col justify-center items-center text-center">
        <i className="fa-solid fa-truck-fast text-4xl text-red-600 mb-3"></i>
        <h4 className="text-lg font-[Crimson] font-semibold text-gray-800">Free Delivery</h4>
        <p className="text-gray-600 text-sm max-w-xs">Get your favorite styles delivered to your doorstep at no extra cost.</p>
      </div>

    
      <div className="flex flex-col justify-center items-center text-center">
        <i className="fa-solid fa-sack-dollar text-4xl text-green-600 mb-3"></i>
        <h4 className="text-lg   font-[Crimson] font-semibold text-gray-800">100% Money Back Guarantee</h4>
        <p className="text-gray-600 text-sm max-w-xs">Shop with confidence! If you're not satisfied, we’ll refund your money.</p>
      </div>

     
      <div className="flex flex-col justify-center items-center text-center">
        <i className="fa-solid fa-phone-volume text-4xl text-blue-600 mb-3"></i>
        <h4 className="text-lg   font-[Crimson] font-semibold text-gray-800">Strong Support</h4>
        <p className="text-gray-600 text-sm max-w-xs">Need help? Our support team is available 24/7 to assist you.</p>
      </div>

    </div>
  );
}

export default Promobanner;
