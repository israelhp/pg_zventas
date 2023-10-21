import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/auth-api'
import { navApi } from './api/nav-api'
import { catalogApi } from './api/catalog-api'
import { orderApi } from './api/order-pai'
import authReducer from './slice/authSlice'
import navReducer from './slice/navSlice'
import shoppingCartReducer from './slice/shoppingSlice'

export const persistancesLocalStorageMiddleware = store => next => action => {
  // auth/login
  next(action)
  if (action.type == 'auth/login') {
    const { authApi, navApi, catalogApi, orderApi, ...stateToPersist } =
      store.getState()
    localStorage.setItem('__redux__state__', JSON.stringify(stateToPersist))
  }

  if (action.type == 'auth/logout') {
    localStorage.removeItem('__redux__state__')
  }

  if (action.type == 'nav/setActive') {
    const { authApi, navApi, catalogApi, orderApi, ...stateToPersist } =
      store.getState()
    localStorage.setItem('__redux__state__', JSON.stringify(stateToPersist))
  }

  if (action.type == 'shoppingCart/addProduct') {
    const { authApi, navApi, catalogApi, orderApi, ...stateToPersist } =
      store.getState()
    localStorage.setItem('__redux__state__', JSON.stringify(stateToPersist))
  }
}

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [navApi.reducerPath]: navApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
    nav: navReducer,
    shoppingCart: shoppingCartReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      navApi.middleware,
      catalogApi.middleware,
      orderApi.middleware,
      persistancesLocalStorageMiddleware
    )
})

setupListeners(store.dispatch)
