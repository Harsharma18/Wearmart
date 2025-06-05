import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../utils/baseUrl';

const authApi = createApi({
    reducerPath:'authapiname',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/auth`,
        credentials:'include',
    }),
    tagTypes: ['Users'],
    endpoints :(builder)=>({
        registerUser : builder.mutation({
            query:(newUser)=>({
                url:"/register",
                method:"POST",
                body:newUser
            })

        }),
        loginUser: builder.mutation({
            query:(credentials)=>({
                url:"/login",
                method:"POST",
                body:credentials,
 
            })
        }),
        logoutUser : builder.mutation({
            query:()=>({
                "method":"POST",
                url:"/logout",

            })
           
        }),
        getUser:builder.query({
            query:()=>({
                method:"GET",
                url:"/users",
            }),
            providesTags: ['Users']
          
        }),   
        updateUserrole:builder.mutation({
            query : ({userId,role})=>({
                 method:"PUT",
               url:`/users/${userId}`,
               body:{role},

            }),
            invalidatesTags: ['Users']
              
        }),
        deleteUser : builder.mutation({
            query : (userId)=>({
            url:`/users/${userId}`,
            method:"DELETE",
            }),
            invalidatesTags: ['Users']
           
        }),
        editProfile: builder.mutation({
            query:(profileData)=>({
                url:"/edit-profile",
                method:"PATCH",
                body:profileData,
                

            }),
            invalidatesTags: ['Users']
        })
    })
});
export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation,
    useDeleteUserMutation,useUpdateUserroleMutation,useGetUserQuery,useEditProfileMutation
} = authApi;
export default authApi;