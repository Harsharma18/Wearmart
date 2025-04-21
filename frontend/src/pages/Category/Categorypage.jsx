import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {products} from  "../../data/products.js"
import ProductCard from '../Shops/Productcard';

function Categorypage() {
    const {categoryName} = useParams();
    const [filterProduct,setfilterProduct] = useState([]);
    useEffect(()=>{
        const filtered = products.filter((item)=>item.category.toLowerCase() === categoryName.toLowerCase());
        // console.log("filtered product",filtered);
        setfilterProduct(filtered);
    },[categoryName]);
    useEffect(()=>{window.scroll(0,0),[]})
    
  return (
    <div className='container mx-auto  w-full md:w-[70%] p-6 mt-2'>
    {/* Category Header Section */}
    <div className='w-full shadow-2xl rounded-4xl h-64 bg-gray-100 flex flex-col justify-center items-center text-center px-6'>
        <h1 className='uppercase text-2xl sm:text-3xl font-[monton] font-semibold text-gray-800 animate-bounce'>
            {categoryName}
        </h1>
        <p className="text-lg sm:text-xl max-w-xl opacity-90 mt-2 text-gray-700">
            Explore the best <span className="font-semibold">{categoryName}</span> collections, handpicked for you.  
            Shop the latest trends exclusively at <span className="font-semibold text-red-500">Wear Mart</span>.
        </p>
    </div>

    {/* Product Section */}
    <div className="mt-6">
    {filterProduct.length > 0 ? (
        <ProductCard products={filterProduct} />
    ) : (
        <div className="flex flex-col items-center justify-center h-60 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
                No products found in {categoryName}
            </h2>
            <p className="text-gray-500 mt-2 text-center px-4">
                Sorry, we couldn't find any products in this category.  
            </p>
        </div>
    )}
</div>

</div>

  )
}

export default Categorypage;
