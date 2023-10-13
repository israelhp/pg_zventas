import { Input, Button } from '@nextui-org/react'
import { useState } from 'react'
import useAuthActions from '../hooks/useAuthActions'
import { isValidEmail } from '../utils/utils'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCreate, setIsCreate] = useState({ result: 0, message: '' })
  const { performCreateUser, isCreateUserLoading } = useAuthActions()

  const handleSubmit = async () => {
    const errors = validateInputs(username, email, password)

    if (Object.keys(errors).length > 0) {
      setIsCreate({
        result: 2,
        message: errors.message
      })
      return
    }

    const result = await performCreateUser({
      username,
      password,
      email,
      role: 1
    })
    setIsCreate(result)
    if (result.result === 1) {
      cleanInputs()
    }
  }

  const messageStyle = {
    color: isCreate.result === 1 ? 'green' : 'red'
  }

  function validateInputs(username, email, password) {
    const errors = {}

    if (!password)
      errors.message = 'El campo de contraseña no puede estar vacío.'

    if (!email)
      errors.message = 'El campo de correo electrónico no puede estar vacío.'
    else if (!isValidEmail(email))
      errors.message = 'El correo electrónico no es válido.'

    if (!username) errors.message = 'El campo de usuario no puede estar vacío.'

    return errors
  }

  const cleanInputs = () => {
    setUsername('')
    setPassword('')
    setEmail('')
  }

  return (
    <div className="bg-white p-4 md:p-8 border shadow-md shadow-blue-50 rounded-xl w-full mb-4 md:mb-0">
      <h2 className="text-xl font-semibold  mb-8">Registrate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="User"
            variant="bordered"
            value={username}
            onValueChange={setUsername}
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            label="Email"
            variant="bordered"
            value={email}
            onValueChange={setEmail}
          />
        </div>
        <div className="mb-8">
          <Input
            label="Password"
            type="password"
            variant="bordered"
            value={password}
            onValueChange={setPassword}
          />
        </div>
        <div>
          <p className="text-small text-center" style={messageStyle}>
            {isCreate.result != 0 ? isCreate.message : ''}
          </p>
        </div>

        <div className="mt-7 flex justify-center items-center gap-4">
          <Button
            className="w-9/12"
            color="primary"
            onPress={handleSubmit}
            isLoading={isCreateUserLoading}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
