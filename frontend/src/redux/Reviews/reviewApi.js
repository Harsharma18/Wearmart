import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseUrl";

const reviewApi = createApi({
  reducerPath: "reviewapi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/review`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      console.log(getState().auth);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewBody) => ({
        method: "POST",
        url: "/post-review",
        body: reviewBody,
      }),
      invalidatesTags: ["Reviews"],
    }),
    fetchTotalReviews: builder.query({
      query: () => ({
        method: "GET",
        url: "/total-review",
      }),
    }),
    fetchAllReviewByUserid: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/${userId}`,
      }),
      providesTags: ["Reviews"],
    }),
    fetchAllReviewsByProductId: builder.query({
      query: (productId) => ({
        method: "GET",
        url: `/product/${productId}`,
      }),
      providesTags: ["Reviews"],
    }),
    editReview: builder.mutation({
      query: ({ reviewId, ...body }) => ({
        method: "PUT",
        url: `/edit-review/${reviewId}`,
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        method: "DELETE",
        url: `/delete-review/${reviewId}`,
      }),
      invalidatesTags: ["Reviews"],
    }),
    likeReview: builder.mutation({
      query: (reviewId) => ({
        method: "POST",
        url: `/like-review/${reviewId}`,
      }),
      invalidatesTags: ["Reviews"],
    }),
    dislikeReview: builder.mutation({
      query: (reviewId) => ({
        method: "POST",
        url: `/dislike-review/${reviewId}`,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useFetchTotalReviewsQuery,
  useFetchAllReviewByUseridQuery,
  useFetchAllReviewsByProductIdQuery,
  useEditReviewMutation,
  useDeleteReviewMutation,
  useLikeReviewMutation,
  useDislikeReviewMutation,
} = reviewApi;
export default reviewApi;
