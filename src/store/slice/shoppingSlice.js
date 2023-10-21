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
        return product.code !== action.payload.code
      })
      state.count = state.count - 1
      return state
    },
    removeAllProducts: state => {
      state.products = []
      state.count = 0
    },
    updateProduct: (state, action) => {
      state.products = state.products.map(product => {
        if (product.code == action.payload.code) return action.payload
        return product
      })
    }
  }
})

export const { addProduct, removeProduct, removeAllProducts, updateProduct } =
  shoppingCartSlice.actions
export default shoppingCartSlice.reducer
