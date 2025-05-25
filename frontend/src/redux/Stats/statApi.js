import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";

const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/stat`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (email) => ({
        url: `/userstats/${email}`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
    getAdminStats: builder.query({
      query: () => "/adminstats",
      providesTags: ["Stats"],
    }),
  }),
});


export const { useGetUserStatsQuery, useGetAdminStatsQuery } = statsApi;

export default statsApi;
