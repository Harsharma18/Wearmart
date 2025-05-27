import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../utils/baseUrl';
const orderApi = createApi({
     reducerPath: 'orderapi',
      baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/order`,
        credentials: 'include'
    }),
    tagTypes:["Order"],
    endpoints:(builder)=>({
        getOrderByEmails:builder.query({
            query:(email)=>({
                url:`/${email}`,
                method:"GET",
            }),
             providesTags: ['Order'],
        })
    })
});
export const {useGetOrderByEmailsQuery} = orderApi;
export default orderApi;