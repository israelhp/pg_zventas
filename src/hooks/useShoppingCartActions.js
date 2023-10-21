import {
  addProduct,
  removeProduct,
  removeAllProducts,
  updateProduct
} from '../store/slice/shoppingSlice'
import { useAppDispatch, useAppSelector } from './store'

const useShoppingCartActions = () => {
  const shoppingCart = useAppSelector(state => state.shoppingCart)
  const dispatch = useAppDispatch()

  const performAddProduct = product => {
    if (!shoppingCart.products.some(p => p.code === product.code))
      dispatch(addProduct(product))
  }

  const performUpdateProduct = product => {
    dispatch(updateProduct(product))
  }
  const performRemoveProduct = product => {
    dispatch(removeProduct(product))
  }

  const performRemoveAllProducts = () => {
    // Llama a la acción removeAllProducts para eliminar todos los productos
    dispatch(removeAllProducts())
  }

  return {
    performAddProduct,
    performRemoveProduct,
    performRemoveAllProducts,
    performUpdateProduct
  }
}

export default useShoppingCartActions
