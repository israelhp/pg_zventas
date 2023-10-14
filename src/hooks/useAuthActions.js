import { login, logout } from '../store/slice/authSlice'
import {
  usePostLoginMutation,
  useCreateUserMutation,
  useSendResetCodeMutation
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

  const [
    sendResetCode,
    {
      isLoading: isSendResetCodeLoading,
      isError: isSendResetCodeError,
      error: sendResetCodeError
    }
  ] = useSendResetCodeMutation()

  const performLogin = async credentials => {
    try {
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

  const performLogout = () => {
    dispatch(logout())
  }

  const performCreateUser = async newUser => {
    try {
      const result = await createUser(newUser).unwrap()
      if (result.error) return { result: 2, message: 'Intenta de nuevo' }
      if (result.code == 400) return { result: 3, message: 'Usuario ya existe' }
      if (result.code == 200)
        return { result: 1, message: 'Se creo el usuario correctamente' }
    } catch (error) {
      return { result: 2, message: 'Intenta de nuevo' }
    }
  }

  const performSendMail = async username => {
    try {
      const res = await sendResetCode(username).unwrap()

      if (res.error) return { result: -1, message: 'Intenta de nuevo' }

      return { result: res.code, message: res.message }
    } catch (e) {
      return { result: -1, message: 'Intenta mas tarde' }
    }
  }

  return {
    performLogin,
    performLogout,
    performCreateUser,
    performSendMail,
    isLoginLoading,
    isCreateUserLoading,
    isSendResetCodeLoading,
    isLoginError,
    isCreateUserError,
    isSendResetCodeError,
    loginError,
    createUserError,
    sendResetCodeError
  }
}

export default useAuthActions
