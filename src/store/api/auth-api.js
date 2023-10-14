import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AUTH_LOGIN_ENPOINT,
  AUTH_REGISTER_ENPOINT,
  AUTH_SEND_RESET_CODE_ENPOINT
} from '../../constants/enpoints'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_TITLE}` }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    postLogin: builder.mutation({
      query: credentials => ({
        url: AUTH_LOGIN_ENPOINT,
        method: 'POST',
        body: new URLSearchParams(credentials).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    createUser: builder.mutation({
      query: userData => ({
        url: AUTH_REGISTER_ENPOINT,
        method: 'POST',
        body: userData
      })
    }),
    sendResetCode: builder.mutation({
      query: username => ({
        url: AUTH_SEND_RESET_CODE_ENPOINT,
        method: 'POST',
        body: username
      })
    })
  })
})

export const {
  usePostLoginMutation,
  useCreateUserMutation,
  useSendResetCodeMutation
} = authApi
