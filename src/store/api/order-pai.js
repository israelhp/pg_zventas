import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  ORDER_ADD_ORDER_ENPOINT,
  ORDER_LIST_ORDER_ENPOINT
} from '../../constants/enpoints'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_TITLE}` }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    addOrder: builder.mutation({
      query: data => ({
        url: ORDER_ADD_ORDER_ENPOINT,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.token}`, // Agrega el token Bearer al encabezado
          'Content-Type': 'application/json' // Puedes ajustar otros encabezados según sea necesario
        },
        body: data.data
      })
    }),
    listOrders: builder.mutation({
      query: data => ({
        url: ORDER_LIST_ORDER_ENPOINT,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.token}`, // Agrega el token Bearer al encabezado
          'Content-Type': 'application/json' // Puedes ajustar otros encabezados según sea necesario
        }
      })
    })
  })
})

export const { useAddOrderMutation, useListOrdersMutation } = orderApi
