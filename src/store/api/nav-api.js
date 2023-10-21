import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { NAV_BRAND_ENPOINT } from '../../constants/enpoints'

export const navApi = createApi({
  reducerPath: 'navApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_TITLE}` }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    searchCategories: builder.mutation({
      query: data => ({
        url: NAV_BRAND_ENPOINT,
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useSearchCategoriesMutation } = navApi
