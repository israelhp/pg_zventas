import { createSlice } from '@reduxjs/toolkit'
import { optionsNav } from '../../constants/constants'

const initialState = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  if (persistedState) {
    return JSON.parse(persistedState).auth
  }
  return {
    id: optionsNav[0].id
  }
})()

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export const { setActive } = navSlice.actions
export default navSlice.reducer
