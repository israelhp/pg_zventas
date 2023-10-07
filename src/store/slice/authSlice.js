import { createSlice } from '@reduxjs/toolkit'

const initialState = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  if (persistedState) {
    return JSON.parse(persistedState).auth
  }
  return {
    isAuthenticated: false,
    user: null,
    token: ''
  }
})()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload
      state.isAuthenticated = true
      return state
    },
    logout: state => {
      state.isAuthenticated = false
      state.user = null
      return state
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
