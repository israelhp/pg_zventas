import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/auth-api'
import authReducer from './slice/authSlice'
import navReducer from './slice/navSlice'

export const persistancesLocalStorageMiddleware = store => next => action => {
  // auth/login
  next(action)
  if (action.type == 'auth/login') {
    const { authApi, ...stateToPersist } = store.getState()
    localStorage.setItem('__redux__state__', JSON.stringify(stateToPersist))
  }

  if (action.type == 'nav/itemactive') {
    console.log(action)
  }
}

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    nav: navReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      persistancesLocalStorageMiddleware
    )
})

setupListeners(store.dispatch)
