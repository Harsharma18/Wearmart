import React, { useEffect, useRef, useState } from 'react';
import { products } from "../../data/products";
import ProductCard from "./Productcard";
import Shopfilter from './shopfilter';
import { useFetchAllProductsQuery } from '../../redux/Products/productapi';
import ShopPageSkeleton from '../../components/Shopskelton';

const filterOption = {
  categories: ["all", ...new Set(products.map((item) => item.category))],
  brands: ["all", ...new Set(products.map((item) => item.brand))],
  colors: ["all", ...new Set(products.map((item) => item.color))],
  ratings: ["all", "1", "2", "3", "4", "5"],
  priceRange: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 & Above", min: 200, max: Infinity },
  ]
};

function Shoppage() {
  const dropref = useRef(null);
  const [filterState, setFilterState] = useState({
    categories: "all",
    brands: "all",
    colors: "all",
    ratings: "all",
    priceRange: null,
    searchInput: '',
    sort: 'Default',
  });
  const [filterdiv, setFilterDiv] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [productPerPage ] = useState(8);
  const {
    data={},
    isLoading,
    error
  } = useFetchAllProductsQuery({
    searchInput: filterState?.searchInput || '',
    category: filterState?.categories !== 'all' ? filterState?.categories : '',
    brand: filterState?.brands !== 'all' ? filterState?.brands : '',
    color: filterState?.colors !== 'all' ? filterState?.colors : '',
    ratings: filterState?.ratings !== 'all' ? filterState?.ratings : '',
    minPrice: filterState?.priceRange?.min || '',
    maxPrice: filterState?.priceRange?.max || '',
    sort: filterState?.sort || '',
    page: currentPage,
    limit: productPerPage,
  });
  console.log(data);

  // Handle outside click to close filter dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropref.current && !dropref.current.contains(e.target)) {
        setFilterDiv(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  // Apply Filtering
  // const applyFilter = () => {
  //   let filtered = [...products];
  //   const { categories, brands, colors, ratings, priceRange, searchInput } = filterState;

  //   if (categories !== "all") {
  //     filtered = filtered.filter((item) =>
  //       item.category?.toLowerCase().includes(categories.toLowerCase())
  //     );
  //   }
  //   if (brands !== "all") {
  //     filtered = filtered.filter((item) =>
  //       item.brand?.toLowerCase().includes(brands.toLowerCase())
  //     );
  //   }
  //   if (colors !== "all") {
  //     filtered = filtered.filter((item) =>
  //       item.color?.toLowerCase().includes(colors.toLowerCase())
  //     );
  //   }
  //   if (ratings !== "all") {
  //     filtered = filtered.filter((item) => item.rating === +ratings);
  //   }
  //   if (priceRange) {
  //     filtered = filtered.filter(
  //       (item) => item.price >= priceRange.min && item.price <= priceRange.max
  //     );
  //   }
  //   if (searchInput) {
  //     filtered = filtered.filter((item) =>
  //       item.name?.toLowerCase().includes(searchInput.toLowerCase())
  //     );
  //   }

  //   setFilteredProducts(filtered);
  //   setSortedProducts(filtered); // Reset sort after filter is applied
  // };

  // // Apply Sorting
  // const applySort = () => {
  //   let sorted = [...filteredProducts];

  //   if (filterState.sort === "priceLowToHigh") {
  //     sorted.sort((a, b) => a.price - b.price);
  //   } else if (filterState.sort === "priceHighToLow") {
  //     sorted.sort((a, b) => b.price - a.price);
  //   } else if (filterState.sort === "ratingHighToLow") {
  //     sorted.sort((a, b) => b.rating - a.rating);
  //   } else if (filterState.sort === "nameAZ") {
  //     sorted.sort((a, b) => a.name.localeCompare(b.name));
  //   } else if (filterState.sort === "nameZA") {
  //     sorted.sort((a, b) => b.name.localeCompare(a.name));
  //   }

  //   setSortedProducts(sorted);
  // };
  // useEffect(() => {
  //   applyFilter(); 
  // }, [filterState]);

  // useEffect(() => {
  //   applySort(); 
  // }, [filterState.sort, filteredProducts]);
  // Reset filters


  const clearFilter = () => {
    setFilterState({
      categories: "all",
      colors: "all",
      brands: "all",
      ratings: "all",
      priceRange: null,
      sort: "Default",
      searchInput: "",
    });
    setCurrentPage(1);
  };
  if (isLoading) return <ShopPageSkeleton/>;
  if (error) return (
    <div className="container mx-auto w-full md:w-[70%] p-6 mt-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading products. Please try again later.
      </div>
    </div>
  );
  

  const totalPages = data?.totalPages || 1;
  const totalProducts = data?.totalProducts || 0;
  let buttonperPage = 4; // how many page buttons visible at a time
  let startIndex = Math.floor((currentPage - 1)/buttonperPage)*buttonperPage + 1;
  let endIndex = Math.min(startIndex + buttonperPage - 1, totalPages);
  let pageNumberArray = [];
  for (let i=startIndex; i<=endIndex; i++) {
    pageNumberArray.push(i);
  }
  const handlechangeNumber = (pageNumber)=>{
    if(pageNumber>=1 && pageNumber<=totalPages){
      setCurrentPage(pageNumber);
    }
  }
  return (
    <div className="container mx-auto w-full md:w-[70%] p-6 mt-4">
      {/*  Header */}
      <div className="w-full  shadow-lg rounded-xl h-60 bg-gray-100 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-lg  font-bold text-gray-800 text-center
  overflow-y-scroll max-h-20 max-w-sm px-2 scrollbar-hide"
>
  {filterState.categories !== "all" ? `Category: ${filterState.categories} | `: ""}
  {filterState.brands !== "all" ? `Brand: ${filterState.brands} | ` : ""}
  {filterState.colors !== "all" ? `Color: ${filterState.colors} | ` : ""}
  {filterState.ratings !== "all" ? `Rating: ${filterState.ratings}⭐ | ` : ""}
  {filterState.priceRange ? `Price: ${filterState.priceRange.label} | ` : ""}
  {filterState.searchInput ? `Search: "${filterState.searchInput}" | ` : ""}
  {filterState.sort !== "Default" ? `Sort: ${filterState.sort} | ` : ""}
  {!filterState.searchInput && filterState.categories === "all" &&
  filterState.brands === "all" && filterState.colors === "all" &&
  filterState.ratings === "all" && !filterState.priceRange && filterState.sort === "Default" ? "All Products" : ""}
</h1>

        <p className="text-lg sm:text-xl max-w-xl  mt-2 text-gray-700">
          Browse through our exclusive collection and discover amazing deals.
          Find everything you need with our easy-to-use search and filters,
          only at <span className="font-semibold text-red-500">Wear Mart</span>.
        </p>
      </div>


      <div className='grid grid-cols-1 mt-3 gap-2 md:grid-cols-4 w-full items-start'>
      <div className="  hidden md:block md:col-span-1  p-2 h-1/3 ">
         <Shopfilter
    filterOption={filterOption}
    filterState={filterState}
    setFilterState={setFilterState}
    clearFilter={clearFilter}
        />
       
</div>
       {/* Mobile Filter */}
       {filterdiv && (
  <div
  ref={dropref}
    className={` scrollbar-hide md:hidden fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg overflow-auto 
    transition-transform duration-700  ${filterdiv ? "translate-x-0" : "-translate-x-full"}`}
    style={{ zIndex: 90 }}
  >
    <button
      className="bg-red-500 text-white px-3 py-1 rounded-md absolute top-2 right-2"
      onClick={() => setFilterDiv(false)}
    >
      Close
    </button>
    <div className="h-full overflow-auto">
      <Shopfilter
        filterOption={filterOption}
        filterState={filterState}
        setFilterState={setFilterState}
        clearFilter={clearFilter}
      />
    </div>
  </div>
)}

        <div className='md:col-span-3 p-2'>
          <button
          onClick={()=> setFilterDiv(true)}
           className='md:hidden bg-blue-500 text-white px-4 py-2 rounded-md mb-4 w-full '>Show Filter</button>
            <h3 className='text-xl font-semibold  ml-8 '>
           Showing {startIndex} to {endIndex} of {totalProducts} products.
                        </h3>
      <ProductCard products={data?.products || []} clearFilter={clearFilter}   filterState={filterState}/>
      {/* // {sortedProducts.length === 0 ? (
//   <div className="text-center text-gray-500 text-lg mt-5">
//      No products found. Try changing filters.
//   </div>
// ) : (
//   <ProductCard products={sortedProducts} />

// )} */}
       {/* Fix the pagination section */}
{
  totalPages > 1 && (
    <div className="flex justify-center mt-6 space-x-2">
      <button 
        disabled={currentPage === 1} 
        onClick={() => handlechangeNumber(currentPage - 1)}
        className={`px-3 py-2 border rounded-md transition-all ${
          currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Prev
      </button>

      {pageNumberArray.map((number) => (
        <button
          key={number}
          onClick={() => handlechangeNumber(number)}
          className={`px-3 py-2 border rounded-md transition-all ${
            currentPage === number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
      
      <button 
        disabled={currentPage === totalPages} 
        onClick={() => handlechangeNumber(currentPage + 1)}
        className={`px-3 py-2 border rounded-md transition-all ${
          currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  )
}
     
        </div>
      </div>
    </div>
  );
}

export default Shoppage;





// import React, { useState, useEffect } from "react";
// import ProductCard from "./Productcard";
// import { products } from "../../data/products";

// const filterOptions = {
//   category: ["all", "accessories", "clothing", "sports", "grooming", "festivfit", "footwear"],
//   colors: ["all", "black", "white", "blue", "brown", "navy", "gray", "gold", "red", "maroon"],
//   brands: ["all", "Nike", "Adidas", "Puma", "Levi's", "Zara", "H&M", "Ray-Ban", "Gucci", "Rolex"],
//   ratings: ["all", "1", "2", "3", "4", "5"],
//   priceRange: [
//     { label: "Under $50", min: 0, max: 50 },
//     { label: "$50 - $100", min: 50, max: 100 },
//     { label: "$100 - $200", min: 100, max: 200 },
//     { label: "$200 & Above", min: 200, max: Infinity },
//   ],
// };

// const Shoppage = () => {
//   const [filters, setFilters] = useState({
//     category: "",
//     color: "",
//     brand: "",
//     rating: "",
//     priceRange: null,
//     sort: "",
//     search: "",
//   });

//   const [filteredProducts, setFilteredProducts] = useState(products);

//   // 🔹 **Filtering Logic**
//   useEffect(() => {
//     let filtered = products;

//     if (filters.category && filters.category !== "all") {
//       filtered = filtered.filter((item) => item.category.toLowerCase() === filters.category.toLowerCase());
//     }
//     if (filters.color && filters.color !== "all") {
//       filtered = filtered.filter((item) => item.color.toLowerCase() === filters.color.toLowerCase());
//     }
//     if (filters.brand && filters.brand !== "all") {
//       filtered = filtered.filter((item) => item.brand.toLowerCase() === filters.brand.toLowerCase());
//     }
//     if (filters.rating && filters.rating !== "all") {
//       filtered = filtered.filter((item) => item.rating === +filters.rating);
//     }
//     if (filters.priceRange) {
//       filtered = filtered.filter((item) => item.price >= filters.priceRange.min && item.price <= filters.priceRange.max);
//     }
//     if (filters.search) {
//       filtered = filtered.filter((item) => item.name.toLowerCase().includes(filters.search.toLowerCase()));
//     }

//     setFilteredProducts(filtered);
//   }, [filters]);

//   // 🔹 **Sorting Logic**
//   useEffect(() => {
//     let sortedProducts = [...filteredProducts];

//     if (filters.sort === "priceLowToHigh") {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (filters.sort === "priceHighToLow") {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     } else if (filters.sort === "ratingHighToLow") {
//       sortedProducts.sort((a, b) => b.rating - a.rating);
//     } else if (filters.sort === "nameAZ") {
//       sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (filters.sort === "nameZA") {
//       sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     setFilteredProducts(sortedProducts);
//   }, [filters.sort]);

//   //  **Clear Filters**
//   const handleClear = () => {
//     setFilters({
//       category: "",
//       color: "",
//       brand: "",
//       rating: "",
//       priceRange: null,
//       sort: "",
//       search: "",
//     });
//   };

//   return (
//    <div className="container mx-auto w-full md:w-[70%] p-6 mt-4">
//       {/* 🔹 Header */}
//       <div className="w-full shadow-lg rounded-xl h-60 bg-gray-100 flex flex-col justify-center items-center text-center px-6">
//         <h1 className="text-2xl sm:text-2xl font-bold text-gray-800">Shop page</h1>
//         <p className="text-lg sm:text-xl max-w-xl opacity-90 mt-2 text-gray-700">
//           Browse through our exclusive collection and discover amazing deals.
//           Find everything you need with our easy-to-use search and filters,
//           only at <span className="font-semibold text-red-500">Wear Mart</span>.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 mt-3 gap-2 md:grid-cols-4 w-full">
//         {/*  Filters Section */}
//         <div className="border md:col-span-1 flex flex-col p-4">
//           {/* Search Bar */}
//           <input
//             type="text"
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             placeholder="Search products..."
//             className="border p-2 rounded w-full"
//           />
//           <button onClick={() => setFilters({ ...filters, search: "" })} className="mt-2 bg-gray-200 p-2 rounded">
//             Clear Search
//           </button>

//           {/*  Category */}
//           <h3 className="font-semibold mt-3">Category</h3>
//           {filterOptions.category.map((name) => (
//             <button
//               key={name}
//               onClick={() => setFilters({ ...filters, category: name })}
//               className={`mt-1 p-2 rounded-md ${filters.category === name ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//             >
//               {name}
//             </button>
//           ))}

//           {/*   Colors */}
//           <h3 className="font-semibold mt-3">Color</h3>
//           {filterOptions.colors.map((name) => (
//             <button
//               key={name}
//               onClick={() => setFilters({ ...filters, color: name })}
//               className={`mt-1 p-2 rounded-md ${filters.color === name ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//             >
//               {name}
//             </button>
//           ))}

//           {/*  Brands */}
//           <h3 className="font-semibold mt-3">Brand</h3>
//           {filterOptions.brands.map((name) => (
//             <button
//               key={name}
//               onClick={() => setFilters({ ...filters, brand: name })}
//               className={`mt-1 p-2 rounded-md ${filters.brand === name ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//             >
//               {name}
//             </button>
//           ))}

//           {/*  Ratings */}
//           <h3 className="font-semibold mt-3">Ratings</h3>
//           {filterOptions.ratings.map((name) => (
//             <button
//               key={name}
//               onClick={() => setFilters({ ...filters, rating: name })}
//               className={`mt-1 p-2 rounded-md ${filters.rating === name ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//             >
//               {name}
//             </button>
//           ))}

//           {/*  Price Range */}
//           <h3 className="font-semibold mt-3">Price Range</h3>
//           {filterOptions.priceRange.map((range) => (
//             <button
//               key={range.label}
//               onClick={() => setFilters({ ...filters, priceRange: range })}
//               className="mt-1 p-2 rounded-md bg-gray-200"
//             >
//               {range.label}
//             </button>
//           ))}

//           {/* Sorting */}
//           <h3 className="font-semibold mt-3">Sort By</h3>
//           <select className="border p-2 rounded-md w-full" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
//             <option value="">Select</option>
//             <option value="priceLowToHigh">Price: Low to High</option>
//             <option value="priceHighToLow">Price: High to Low</option>
//             <option value="ratingHighToLow">Rating: High to Low</option>
//           </select>

//           {/*  Clear Filters */}
//           <button onClick={handleClear} className="mt-4 bg-red-500 text-white p-2 rounded">Clear Filters</button>
//         </div>

//         {/*  Product Display */}
//         <div className="border md:col-span-3 w-full">
//           <ProductCard products={filteredProducts} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shoppage;

// import React, { useState, useEffect } from "react";
// import ProductCard from "./Productcard";
// import { products } from "../../data/products";

// const filterOptions = {
//   category: ["all",...new Set(products.map((item)=>item.category))],
//   colors: ["all", ...new Set(products.map((item) => item.color))],
//   brands: ["all", ...new Set(products.map((item) => item.brand))],
//   ratings: ["all", "1", "2", "3", "4", "5"],
//   priceRange: [
//     { label: "Under $50", min: 0, max: 50 },
//     { label: "$50 - $100", min: 50, max: 100 },
//     { label: "$100 - $200", min: 100, max: 200 },
//     { label: "$200 & Above", min: 200, max: Infinity },
//   ],
// };

// const Shoppage = () => {
//   const [category, setCategory] = useState("all");
//   const [colors, setColors] = useState("all");
//   const [brand, setBrand] = useState("all");
//   const [rating, setRating] = useState("all");
//   const [priceR, setPriceR] = useState(null);
//   const [sortp, setSortp] = useState("");
//   const [search, setSearch] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   useEffect(() => {
//     let filtered = products;

//     if (category && category !== "all") {
//       filtered = filtered.filter((item) => item.category.toLowerCase() === category.toLowerCase());
//     }
//     if (colors && colors !== "all") {
//       filtered = filtered.filter((item) => item.color.toLowerCase() === colors.toLowerCase());
//     }
//     if (brand && brand !== "all") {
//       filtered = filtered.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
//     }
//     if (rating && rating !== "all") {
//       filtered = filtered.filter((item) => item.rating === +rating);
//     }
//     if (priceR) {
//       filtered = filtered.filter((item) => item.price >= priceR.min && item.price <= priceR.max);
//     }
//     if (search) {
//       filtered = filtered.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     setFilteredProducts(filtered);
//   }, [category, colors, brand, rating, priceR, search]);

//   useEffect(() => {
//     let sortedProducts = [...filteredProducts];

//     if (sortp === "priceLowToHigh") {
//       sortedProducts.sort((a, b) => a.price - b.price);
//     } else if (sortp === "priceHighToLow") {
//       sortedProducts.sort((a, b) => b.price - a.price);
//     } else if (sortp === "ratingHighToLow") {
//       sortedProducts.sort((a, b) => b.rating - a.rating);
//     } else if (sortp === "nameAZ") {
//       sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortp === "nameZA") {
//       sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     setFilteredProducts(sortedProducts);
//   }, [sortp]);

//   //**Clear Filters**
//   const handleClear = () => {
//     setCategory("all");
//     setColors("all");
//     setBrand("all");
//     setRating("all");
//     setPriceR(null);
//     setSortp("");
//     setSearch("");
//     setFilteredProducts(products);
//   };

//   return (
//     <div className="container mx-auto w-full md:w-[80%] p-6 mt-4">
//       {/* Banner Section */}
//       <div className="w-full shadow-lg rounded-xl h-60 bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col justify-center items-center text-center px-6">
//         <h1 className="text-3xl font-bold text-gray-800">Shop Now</h1>
//         <p className="text-lg max-w-xl opacity-90 mt-2 text-gray-700">
//           Discover the best deals and shop from your favorite brands only at{" "}
//           <span className="font-semibold text-red-500">Wear Mart</span>.
//         </p>
//       </div>

//       {/* Layout: Filters + Products */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
//         {/* Left Side: Filter Section */}
//         <div className="p-4 bg-white shadow-md rounded-lg border">
//           <h2 className="text-xl font-bold mb-4 text-gray-700">Filters</h2>

//           {/* Search Bar */}
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search products..."
//             className="border p-2 rounded-md w-full mb-4 focus:ring-2 focus:ring-gray-400"
//           />

//           {/* Category Filter */}
//           <h3 className="font-semibold mt-2 text-gray-600">Category</h3>
//           <div className="flex flex-wrap gap-2">
//             {filterOptions.category.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setCategory(item)}
//                 className={`px-3 py-1 text-sm rounded-md ${
//                   category === item ? "bg-red-500 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>

//           {/* Color Filter */}
//           <h3 className="font-semibold mt-4 text-gray-600">Color</h3>
//           <div className="flex flex-wrap gap-2">
//             {filterOptions.colors.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setColors(item)}
//                 className={`px-3 py-1 text-sm rounded-md ${
//                   colors === item ? "bg-red-500 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>

//           {/* Brand Filter */}
//           <h3 className="font-semibold mt-4 text-gray-600">Brand</h3>
//           <div className="flex flex-wrap gap-2">
//             {filterOptions.brands.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setBrand(item)}
//                 className={`px-3 py-1 text-sm rounded-md ${
//                   brand === item ? "bg-red-500 text-white" : "bg-gray-200"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>

//           {/* Ratings */}
//           <h3 className="font-semibold mt-4 text-gray-600">Ratings</h3>
//           <select
//             className="border p-2 w-full rounded-md focus:ring-2 focus:ring-gray-400"
//             onChange={(e) => setRating(e.target.value)}
//           >
//             {filterOptions.ratings.map((item) => (
//               <option key={item} value={item}>
//                 {item} ⭐
//               </option>
//             ))}
//           </select>

//           {/* Sorting */}
//           <h3 className="font-semibold mt-4 text-gray-600">Sort By</h3>
//           <select
//             className="border p-2 w-full rounded-md focus:ring-2 focus:ring-gray-400"
//             value={sortp}
//             onChange={(e) => setSortp(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option value="priceLowToHigh">Price: Low to High</option>
//             <option value="priceHighToLow">Price: High to Low</option>
//           </select>

//           {/* Clear Filters */}
//           <button onClick={handleClear} className="mt-4 bg-red-500 text-white p-2 rounded-md w-full">
//             Clear Filters
//           </button>
//         </div>

//         {/* Right Side: Product Listing */}
//         <div className="md:col-span-3">
//           <ProductCard products={filteredProducts} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shoppage;
