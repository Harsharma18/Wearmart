// Cartmodel.jsx
import React from "react";
import ReactDOM from "react-dom";
import Ordersummary from "./Ordersummary";
import cartempty from "../../assets/cartempty.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/features/cartSlice";

function Cartmodel({ cartItems, isCartopen, onClose }) {
  const dispatch = useDispatch();

  const modalContent = (
    <div
      className={`fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        isCartopen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed z-[1001] right-0 top-0 w-[300px] md:w-1/3 bg-white h-full overflow-y-auto transition-transform duration-500 ${
          isCartopen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between">
            <h4 className="font-semibold text-xl">Your Cart</h4>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark text-xl text-white bg-black p-1 rounded-md"></i>
            </button>
          </div>

          {/* Cart Items */}
          <div>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-2">
                <div className="mt-40">
                  <img src={cartempty} alt="Empty cart" />
                </div>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                className="flex mt-5 items-center justify-between shadow-md rounded-md p-3 bg-gray-100"
                key={index}
              >
                {/* Left Side: Index + Image + Info */}
                <div className="flex items-center space-x-3">
                  <span className="px-2 bg-red-500 text-white rounded-full">{index + 1}</span>
                  <img
                    className="size-8 md:size-12 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div>
                    <h5 className="text-sm line-clamp-1 font-medium">{item.name}</h5>
                    <p className="text-gray-500 text-sm">${item.price}</p>
                  </div>
                </div>
              
                {/* Right Side: Quantity + Delete */}
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item))}
                    className="hover:text-white bg-gray-200 size-6 flex justify-center items-center px-1.5 rounded-full text-gray-700 hover:bg-red-400"
                  >
                    -
                  </button>
                  <span className="px-2 text-center">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item))}
                    className="hover:text-white bg-gray-200 size-6 flex justify-center items-center px-1.5 rounded-full text-gray-700 hover:bg-red-400"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="text-red-500 hover:text-red-800"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              
              ))
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && <Ordersummary />}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("portal-root"));
}

export default Cartmodel;
