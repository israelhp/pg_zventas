import { setActive } from '../store/slice/navSlice'
import { useAppDispatch } from './store'
import { useSearchCategoriesMutation } from '../store/api/nav-api'

const useNavActions = () => {
  const dispatch = useAppDispatch()
  const [searchCategories] = useSearchCategoriesMutation()

  const setItemMenuActive = id => {
    dispatch(setActive({ id: id }))
  }

  const getCategories = async data => {
    try {
      const res = await searchCategories(data).unwrap()
      return res.data
    } catch (e) {
      console.log('')
    }
  }
  return { setItemMenuActive, getCategories }
}

export default useNavActions
