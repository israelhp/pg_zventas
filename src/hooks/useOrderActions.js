import {
  useAddOrderMutation,
  useListOrdersMutation
} from '../store/api/order-pai'

const useOrderActions = () => {
  const [
    addOrder,
    {
      isLoading: isAddOrderLoading,
      isError: isAddOrderError,
      error: addOrderError
    }
  ] = useAddOrderMutation()
  const [
    listOrders,
    {
      isLoading: isListOrdersLoading,
      isError: isListOrdersError,
      error: listOrdersError
    }
  ] = useListOrdersMutation()

  const performOrder = async data => {
    try {
      const res = await addOrder({ token: data.token, data: data.data })
      console.log(res)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  const performListOrders = async token => {
    try {
      const res = await listOrders({ token: token })
      return res.data.data
    } catch (e) {
      console.error(e)
    }
  }

  return {
    performOrder,
    performListOrders,
    isAddOrderLoading,
    isListOrdersLoading,
    isAddOrderError,
    isListOrdersError,
    addOrderError,
    listOrdersError
  }
}

export default useOrderActions
