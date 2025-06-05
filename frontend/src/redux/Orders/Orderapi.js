import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseUrl";
const orderApi = createApi({
  reducerPath: "orderapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/order`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrderByEmails: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderstatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/updateorder/${id}`,
        method: "PUT",
        body:{ status},
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }), 
});
export const { useGetOrderByEmailsQuery, useGetOrderByIdQuery,useGetAllOrdersQuery,useUpdateOrderstatusMutation,useDeleteOrderMutation } = orderApi;
export default orderApi;
