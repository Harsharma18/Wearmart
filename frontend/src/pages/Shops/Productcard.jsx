import React from 'react';
import { Link } from 'react-router-dom';
import {  useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cartSlice';
const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const handleAddtoCart = (item)=>{
    dispatch(addToCart(item));
    console.log(addToCart(item));
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
              <Link to={`/shop/${item.id}`} className="block w-full h-full">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-2xl"
                />
              </Link>

              {/* Cart Button */}
              <button onClick={()=>handleAddtoCart(item)}
               className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 text-center w-full">
              <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
              <p className="text-gray-500 text-sm capitalize">{item.category}</p>

              {/* Pricing */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-red-600 font-bold text-lg">${item.price}</span>
                {item.oldPrice && (
                  <s className="text-gray-400 text-sm">${item.oldPrice}</s>
                )}
              </div>
              <div>
                <Ratingstar ratings={item.rating}/>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
function Ratingstar({ratings}){
    const getStarColor = (ratings) => {
        if (ratings <= 2) return "text-red-500"; 
        if (ratings === 3) return "text-yellow-500"; 
        return "text-green-500"; 
      };
      
    const stars = [];
     for(let i=0;i<5;i++){

        stars.push(
            <span key={i}> 
              <i className={i < ratings ? `fa-solid fa-star ${getStarColor(ratings)} text-lg` : "fa-regular fa-star text-lg text-gray-400"}></i>
              {/* <i className={`fa-star ${i < ratings ? `fa-solid ${getStarColor(ratings)}` : "fa-regular text-gray-400"} text-lg`}></i> */}

            </span>
          );
        }
    
       
    return (
        <div>
         {stars}
        </div>
    )
}





  