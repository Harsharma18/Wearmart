import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/Products/productapi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { SingleProductSkeleton } from "../../../components/Shopskelton";
import Reviewcard from "../reviews/Reviewcard";
import toast from "react-hot-toast";

function SingleProduct() {
  const [ismore, setismore] = useState(false);
  const handleisMore = () => {
    setismore(!ismore);
  };

  const { id } = useParams();
  const { data = {}, isLoading, error } = useFetchProductByIdQuery(id);
  const singleProduct = data?.product || {};
  const productreviews = data?.reviews|| [];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const description = singleProduct?.description;
  const trimDesc = singleProduct?.description
    ? singleProduct.description.substring(0, 100) + "...."
    : "";
  if (isLoading) return <SingleProductSkeleton />;
  if (error)
    return (
      <div className="text-center text-red-500 py-10 font-medium">
        Something went wrong.
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className=" bg-blue-50 text-center py-8 px-4 rounded-2xl shadow-sm mb-10">
        <h1 className="text-3xl md:text-4xl font-bold  text-blue-800 font-[Poppins] mb-2">
          Single Product Page
        </h1>
        <div className="text-sm text-gray-600 flex flex-wrap justify-center items-center gap-2">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span>&gt;</span>
          <Link to="/shop" className="text-blue-600 hover:underline">
            Shop
          </Link>
          <span>&gt;</span>
          <span className="font-semibold text-gray-800">
            {singleProduct.name}
          </span>
        </div>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex justify-center items-center ">
          <img
            src={singleProduct?.image}
            alt={singleProduct?.name}
            className="w-full max-w-sm h-[400px] object-center  bg-gray-200 rounded-xl shadow-md p-4"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold font-[Poppins] text-gray-900">
            {singleProduct?.name}
          </h2>

          <div className="text-xl md:text-2xl font-bold text-blue-600 flex items-center gap-3">
            ${singleProduct?.price}
            {singleProduct?.oldPrice && (
              <s className="text-gray-400 text-lg">
                ${singleProduct?.oldPrice}
              </s>
            )}
          </div>

          {description && description.length > 100 ? (
            <div className="text-gray-700 font-[Poppins] text-base leading-relaxed">
              <p className="mb-2">{ismore ? description : trimDesc}</p>
              <button
                onClick={handleisMore}
                className={`text-sm font-medium ${
                  ismore ? "text-green-500" : "text-blue-500"
                } underline`}
              >
                {ismore ? "Show less" : "Read more"}
              </button>
            </div>
          ) : (
            <p className="text-gray-700 font-[Poppins] text-base leading-relaxed">
              {description}
            </p>
          )}

          <p>
            <span className="font-bold  text-sm text-gray-700 ">Category:</span>{" "}
            {singleProduct?.category}
          </p>
          <p>
            <span className="font-bold  text-sm text-gray-700">Color:</span>{" "}
            {singleProduct?.color}
          </p>
          <div className="col-span-2 flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            <Ratingstar ratings={singleProduct?.rating} />
          </div> 
         <button
  onClick={() => {
    const isInCart = cartItems.find(item => item._id === singleProduct._id);
    // console.log(isInCart);
    if (isInCart) {
      toast.error("Item already added to cart");
    } else {
      dispatch(addToCart(singleProduct));
      toast.success("Item added to cart");
    }
  }}
  className="inline-flex  cursor-pointer items-center justify-center gap-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-md text-sm font-medium transition duration-300 ease-in-out shadow"
>
  <i className="fa-solid fa-cart-plus"></i> Add to Cart
</button>

        </div>
      </div>
      {/* Product Review Section */}
      {/* Product Review Section */}
      <div className="mt-10 max-w-4xl mx-auto px-4">
  <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Reviews</h1>
  <Reviewcard productreviews={productreviews|| []} />
</div>

    </div>
  );
}

export default SingleProduct;

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
