import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/Products/productapi";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserOrderSkeleton } from "../../../../components/DashboardSkelton";
function Manageproduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(12);
  const {
    data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    isError,
    refetch,
  } = useFetchAllProductsQuery({
    searchInput: "",
    category: "",
    brand: "",
    color: "",
    ratings: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: currentPage,
    limit: productPerPage,
  });
    // console.log(products,totalPages,totalProducts);

  const buttonPerPage = 3;
  const startIndex =
    Math.floor((currentPage - 1) / buttonPerPage) * buttonPerPage + 1;
  const endIndex = Math.min(startIndex + buttonPerPage - 1, totalPages);
  let pageNumberArray = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pageNumberArray.push(i);
  }
  const startProduct = (currentPage - 1) * productPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (id) => {
    console.log(id);
    if (!id) {
      console.error("No product ID provided for deletion.");
      return;
    }
    try {
      const response = await deleteProduct({ id }).unwrap();
      console.log(response);
      alert("Product deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  if (isLoading) {
    return <UserOrderSkeleton />;
  }
  return (
    <section className="py-1   bg-blueGray-50">
      <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex  flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  All Products
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
            <h3 className="my-4  text-sm">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    No.
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Product Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Publishing date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Edit or manage
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products &&
                  products.map((product, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {(currentPage - 1) * productPerPage + 1 + index}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {product?.name}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {moment(product?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}

                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer ">
                        <Link className="  bg-indigo-700 hover:bg-indigo-500 text-white px-4 py-1 rounded-md" to={`/dashboard/update-post/${product._id}`}>
                          {" "}
                        <i class="fas fa-edit"></i>
                        </Link>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <button
                          onClick={() => {
                            // console.log("Deleting product:", product); 
                            handleDeleteProduct(product?._id);
                          }}
                          className="bg-red-600 hover:bg-red-500  text-white px-2 py-1 cursor-pointer"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="mt-6 flex items-center justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
           className={`px-3 py-2 border rounded-md transition-all ${
          currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        >
          Previous
        </button>
        {pageNumberArray.map((pageNumber) => (
          <button
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-md mx-1`}
          >
            {pageNumber}
          </button>
        ))}
         <button 
        disabled={currentPage === totalPages} 
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-3 py-2 border rounded-md transition-all ${
          currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
      </div>
    </section>
  );
}

export default Manageproduct;
