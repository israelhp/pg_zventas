import { createSlice } from '@reduxjs/toolkit'

const initialState = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  if (persistedState) {
    return JSON.parse(persistedState).shoppingCart
  }
  return {
    count: 0,
    products: []
  }
})()

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.count = state.count + 1
      return state
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => {
        console.log(action.payload.code)
        return product.code !== action.payload.code
      })
      state.count = state.count - 1
      return state
    },
    removeAllProducts: state => {
      state.products = []
      state.count = 0
    }
  }
})

export const { addProduct, removeProduct, removeAllProducts } =
  shoppingCartSlice.actions
export default shoppingCartSlice.reducer
