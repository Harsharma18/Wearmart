import React, { useState } from "react";
import { products } from "../../data/products";
import ProductCard from "../Shops/Productcard";

function Searchpage() {
  const [searchinput, setsearchinput] = useState("");
  const [filterProduct, setfilterProduct] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 8;

  // **Calculate indexes for pagination**
  const lastIndex = currentPage * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const currentProduct = filterProduct.slice(firstIndex, lastIndex);
  
  //*Total pages
  const totalPages = Math.ceil(filterProduct.length / productPerPage);

  //pagination number button 
  let buttonperpage = 3;
  let startIndex =  Math.floor((currentPage-1)/buttonperpage)*buttonperpage+1;
  let endIndex =  Math.min(totalPages,startIndex+buttonperpage-1);
  //*Pagination array

  let pageNumbers = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbers.push(i);
  } 

  // let pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  // **Change page number function**
  const changePageNumber = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // **Handle Search**
  function handleSearch() {
    const filtered = products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchinput.toLowerCase()) ||
        item.description.toLowerCase().includes(searchinput.toLowerCase())
    );
    setfilterProduct(filtered);
    setCurrentPage(1); 
  }

  return (
    <div className="container mx-auto w-full md:w-[70%] p-6 mt-4 ">
      {/* Header Section */}
      <div className="w-full shadow-lg rounded-xl h-60 bg-gray-100 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-2xl sm:text-2xl font-bold text-gray-800">
          Search Products
        </h1>
        <p className="text-lg sm:text-xl max-w-xl  mt-2 text-gray-700">
          Find exactly what you're looking for with our powerful search. 
          Discover top-quality products tailored to your needs, only at 
          <span className="font-semibold text-red-500"> Wear Mart</span>.
        </p>
      </div>

      {/* Search Box */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <input
          className="px-3 py-2 w-2/3 md:w-1/2 rounded-md border border-gray-300 shadow-md outline-none"
          type="text"
          placeholder="Search for Products..."
          value={searchinput}
          onChange={(e) => {
            setsearchinput(e.target.value);
            handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-lg transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* Product Listing */}
     {/* Product Listing */}
<div className="mt-6">
  {filterProduct.length > 0 ? (
    <>
      {/* <div className="text-center text-gray-700 font-medium mt-4">
        Showing {currentProduct.length} out of {filterProduct.length} products
      </div> */}
      {/* //or */}
      <div className="text-center text-gray-700 font-medium mt-2">
  Showing {filterProduct.length === 0 ? 0 : firstIndex+1} to {Math.min(lastIndex, filterProduct.length)} out of {filterProduct.length} products
       </div>

      <ProductCard products={currentProduct} />
    </>
  ) : (
    <p className="text-center text-gray-500 mt-4">No products found.</p>
  )}
</div>


      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => changePageNumber(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-md transition-all ${
              currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => changePageNumber(num)}
              className={`px-3 py-2 border rounded-md transition-all ${
                currentPage === num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {num}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => changePageNumber(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-md transition-all ${
              currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Searchpage;



// import React, { useState } from "react";
// import { products } from "../../data/products";
// import ProductCard from "../Shops/Productcard";

// function Searchpage() {
//   const [searchinput, setsearchinput] = useState("");
//   const [visiblecard, setvisiblecard] = useState(10);
//   const [filterProduct, setfilterProduct] = useState(products);

//   function loadmorecard() {
//     setvisiblecard((prev) => prev + 10);
//   }

//   function handleSearch() {
//     const filtered = products.filter(
//       (item) =>
//         item.name.toLowerCase().includes(searchinput.toLowerCase()) ||
//         item.description.toLowerCase().includes(searchinput.toLowerCase())
//     );
//     setfilterProduct(filtered);
//   }

//   return (
//     <div className="container mx-auto w-full md:w-[70%] p-6 mt-4">
//       {/*  Header Section */}
//       <div className="w-full shadow-lg rounded-xl h-60 bg-gray-100 flex flex-col justify-center items-center text-center px-6">
//         <h1 className="text-2xl sm:text-2xl font-bold text-gray-800 ">
//           Search Products
//         </h1>
//         <p className="text-lg sm:text-xl max-w-xl opacity-90 mt-2 text-gray-700">
//            Find exactly what you're looking for with our powerful search.  
//             Discover top-quality products tailored to your needs, only at  
//    <span className="font-semibold text-red-500"> Wear Mart</span>.
// </p>

//       </div>

//       {/* Search Box */}
//       <div className="flex items-center justify-center gap-3 mt-6">
//         <input
//           className="px-3 py-2 w-2/3 md:w-1/2 rounded-md border border-gray-300 shadow-md  outline-none"
//           type="text"
//           placeholder="Search for Products..."
//           value={searchinput}
//           onChange={(e) => {
//             setsearchinput(e.target.value);
//             handleSearch(); 
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-lg transition-all duration-300"
//         >
//           Search
//         </button>
//       </div>

//       {/*  Product Listing */}
//       <div className="mt-6">
//         {filterProduct.length > 0 ? (
//           <ProductCard products={filterProduct.slice(0, visiblecard)} />
//         ) : (
//           <p className="text-center text-gray-500 mt-4">No products found.</p>
//         )}
//       </div>

      
//       {visiblecard < filterProduct.length && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={loadmorecard}
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Searchpage;
