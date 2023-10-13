import { login, logout } from '../store/slice/authSlice'
import {
  usePostLoginMutation,
  useCreateUserMutation
} from '../store/api/auth-api'
import { useAppDispatch } from './store'

const useAuthActions = () => {
  const dispatch = useAppDispatch()
  const [
    postLogin,
    { isLoading: isLoginLoading, isError: isLoginError, error: loginError }
  ] = usePostLoginMutation()
  const [
    createUser,
    {
      isLoading: isCreateUserLoading,
      isError: isCreateUserError,
      error: createUserError
    }
  ] = useCreateUserMutation()

  const performLogin = async credentials => {
    try {
      console.log(credentials)
      const result = await postLogin(credentials).unwrap()
      if (!result.error) {
        const payload = { token: result.access_token }
        dispatch(login(payload))
      }
      return
    } catch (error) {
      console.log('rejected', error)
      return error.data.error_description
    }
  }

  const performLogout = async credentials => {}

  const performCreateUser = async newUser => {
    try {
      const result = await createUser(newUser).unwrap()

      if (result.error) return { result: 2, message: 'Intenta de nuevo' }

      console.log(result)
      if (result.code == 400) return { result: 3, message: 'Usuario ya existe' }
      if (result.code == 200)
        return { result: 1, message: 'Se creo el usuario correctamente' }
    } catch (error) {
      console.error('rejected', error)
      return { result: 2, message: 'Intenta de nuevo' }
    }
  }

  return {
    performLogin,
    performLogout,
    performCreateUser,
    isLoginLoading,
    isCreateUserLoading,
    isLoginError,
    isCreateUserError,
    loginError,
    createUserError
  }
}

export default useAuthActions
