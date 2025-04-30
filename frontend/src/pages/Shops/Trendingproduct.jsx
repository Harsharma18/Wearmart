import React, { useState } from 'react'
import Productcard from './Productcard'
// import {products} from "../../data/products.js"
import { useFetchAllProductsQuery } from '../../redux/Products/productapi.js';
import  { ProductCardSkeleton } from '../../components/Shopskelton.jsx';
function Trendingproduct() {
    const [visiblecard,setvisiblecard] = useState(8);
    const {data={},isLoading,isError} = useFetchAllProductsQuery({
      page: 1,
      limit: 50,
    })
    const loadmorecard = ()=>{
        setvisiblecard((prev)=> prev+6);
    }
    if (isLoading) {
      return <ProductCardSkeleton/>
    }
  
    if (isError) {
      return <div className="text-center py-8 text-red-500">Failed to load products.</div>;
    }
  return (
  <>
 <div className="flex flex-col justify-center items-center text-center py-8 px-4 bg-gray-50">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
    Trending Men's Fashion Products
  </h2>
  <p className="text-gray-600 text-sm sm:text-base max-w-xl">
    Stay ahead of the style game with our exclusive collection of trendsetting men's fashion essentials.
  </p>
</div>
<div>
<Productcard products={data?.products?.slice(0, visiblecard) || []} />
</div>
 
  <div className="flex justify-center items-center mb-12"> 
    {visiblecard < (data?.products?.length || 0) && (
      <button 
        onClick={loadmorecard} 
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
      >   
        Load More
      </button>
    )}
  </div>
 
  </>
  )
}
export default Trendingproduct
