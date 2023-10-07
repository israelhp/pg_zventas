import { login, logout } from '../store/slice/authSlice'
import { usePostLoginMutation } from '../store/api/auth-api'
import { useAppDispatch } from './store'

const useAuthActions = () => {
  const dispatch = useAppDispatch()
  const [postLogin] = usePostLoginMutation()

  const performLogin = async credentials => {
    try {
      const result = await postLogin(credentials).unwrap()
      if (!result.error) {
        const payload = { user: result.data.user, token: result.data.token }
        if (result.data.isAuthenticated) dispatch(login(payload))
      }
    } catch (error) {
      console.error('rejected', error)
    }
  }

  const performLogout = async credentials => {}

  return {
    performLogin,
    performLogout
  }
}

export default useAuthActions
