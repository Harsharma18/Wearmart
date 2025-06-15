import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";
const ProductCard = ({ products, filterState, clearFilter }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddtoCart = (item) => {
    const isInCart = cartItems.find((cartItem) => cartItem._id === item._id);

    if (isInCart) {
      toast.error("Item already in cart");
    } else {
      dispatch(addToCart(item));
      console.log(addToCart(item));
      toast.success("Item added to cart");
    }
  };

  if (!products?.length) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="w-full shadow-lg rounded-xl h-60 bg-gray-100 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Products Found
          </h1>
          <p className="text-lg text-gray-700">
            {filterState.searchInput
              ? `No products match your search "${filterState.searchInput}"`
              : "Try adjusting your filters or search criteria"}
          </p>
          <button
            onClick={clearFilter}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-xl shadow-lg flex flex-col items-center"
          >
            {/* Image Section */}
            <div className="relative  w-full h-[300px] rounded-2xl flex justify-center items-center overflow-hidden group">
              <Link to={`/shop/${item._id}`} className="block w-full h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-2xl"
                />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => handleAddtoCart(item)}
                className="absolute cursor-pointer top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 text-center w-full">
              <h4 className="text-lg line-clamp-1 font-semibold text-gray-800">
                {item.name}
              </h4>
              <p className="text-gray-500 text-sm capitalize">
                {item.category}
              </p>

              {/* Pricing */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-red-600 font-bold text-lg">
                  ${item.price}
                </span>
                {item.oldPrice && (
                  <s className="text-gray-400 text-sm">${item.oldPrice}</s>
                )}
              </div>
              <div>
                <Ratingstar ratings={item.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
function Ratingstar({ ratings }) {
  const getStarColor = (ratings) => {
    if (ratings <= 2) return "text-red-500";
    if (ratings === 3) return "text-yellow-500";
    return "text-green-500";
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          className={
            i < ratings
              ? `fa-solid fa-star ${getStarColor(ratings)} text-lg`
              : "fa-regular fa-star text-lg text-gray-400"
          }
        ></i>
        {/* <i className={`fa-star ${i < ratings ? `fa-solid ${getStarColor(ratings)}` : "fa-regular text-gray-400"} text-lg`}></i> */}
      </span>
    );
  }

  return <div>{stars}</div>;
}
