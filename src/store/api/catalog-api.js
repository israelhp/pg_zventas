import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CATALOG_LIST_CATEGORY_ENPOINT } from '../../constants/enpoints'

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_TITLE}` }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    listCategory: builder.mutation({
      query: data => ({
        url: CATALOG_LIST_CATEGORY_ENPOINT,
        method: 'POST',
        body: data
      })
    }),
    getProduct: builder.mutation({
      query: data => ({
        url: CATALOG_LIST_CATEGORY_ENPOINT,
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useListCategoryMutation, useGetProductMutation } = catalogApi
