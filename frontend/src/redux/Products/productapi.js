import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseUrl";
  const productapi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getBaseUrl()}/api/product` }),
  credentials: "include",
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        searchInput,
        category,
        brand,
        color,
        ratings,
        minPrice,
        maxPrice,
        sort,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || "",
          color: color || "",
          brand: brand || "",
          ratings: ratings || 0,
          searchInput: searchInput || "",
          minPrice: minPrice || 0,
          maxPrice: maxPrice || "",
          sort: sort,
          page: page.toString(),
          limit: limit.toString(),
        }).toString();
        return {
          method: "GET",
          url: `/?${queryParams}`,
        };
      },
      providesTags: ["Products"],
    }),
    fetchProductById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
      providesTags: (result, err, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation({
      query: (additems) => ({
        method: "POST",
        url: "/create-product",
        body: additems,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updateditem }) => ({
        method: "PATCH",
        url: `/update/${id}`,
        body: updateditem,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
      //or
      // invalidatesTags: (result, error, { id }) => [{ type: "Product", id }, "Products"]

    }),
    deleteProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        method: "DELETE",
        url: `/${id}`,
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],

    }),
  }),
});
export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productapi;
export default productapi;

