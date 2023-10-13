import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AUTH_LOGIN_ENPOINT,
  AUTH_REGISTER_ENPOINT
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
    })
  })
})

export const { usePostLoginMutation, useCreateUserMutation } = authApi
