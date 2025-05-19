import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentCancel() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
      
        <div className="flex justify-center mb-4">
          <i className="fas fa-times-circle text-red-600 text-6xl"></i>
        </div>

        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. If this was a mistake, you can try again or return to the homepage.
        </p>

        <button
          onClick={handleBackToHome}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentCancel;
