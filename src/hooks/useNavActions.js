import { setActive } from '../store/slice/navSlice'
import { useAppDispatch } from './store'

const useNavActions = () => {
  const dispatch = useAppDispatch()

  const setItemMenuActive = id => {
    dispatch(setActive({ id: id }))
  }

  return { setItemMenuActive }
}

export default useNavActions
