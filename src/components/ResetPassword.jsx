import { Input, Button } from '@nextui-org/react'
import { useState } from 'react'
import useAuthActions from '../hooks/useAuthActions'
import { useParams } from 'react-router-dom'

// TODO: agregar boton para generar token nuevamente
const ResetPassword = () => {
  const { username } = useParams()
  const [password, setPassword] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [message, setMessage] = useState({ result: 0, message: '' })
  const { performResetCode, isResetPasswordLoading } = useAuthActions()

  const handleSubmit = async () => {
    if (!resetCode || !password) {
      setMessage({ result: -1, message: 'Ingresa los dos campos' })
    }

    const res = await performResetCode({ username, password, resetCode })

    setMessage(res)
  }

  const messageStyle = {
    color: message.result === 200 ? 'green' : 'red'
  }
  return (
    <>
      <div className="flex justify-center items-center h-5/6">
        <div className="mt-8 flex flex-col md:flex-row w-full lg:w-1/4 md:w-1/2 justify-center gap-4 mb-12">
          <div className="bg-white p-4 md:p-8 border shadow-md shadow-blue-50 rounded-xl w-full mb-4 md:mb-0">
            <h2 className="text-xl font-semibold  mb-8">
              Ingresa tu nueva contraseña
            </h2>
            <form>
              <div className="mb-4">
                <Input
                  label="User"
                  variant="bordered"
                  value={username}
                  isInvalid
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Password"
                  variant="bordered"
                  value={password}
                  onValueChange={setPassword}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="resetCode"
                  variant="bordered"
                  value={resetCode}
                  onValueChange={setResetCode}
                />
              </div>
              <div>
                <p className="text-small text-center" style={messageStyle}>
                  {message.result != 0 ? message.message : ''}
                </p>
              </div>

              <div className="mt-7 flex justify-center items-center gap-4">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  onPress={handleSubmit}
                  isLoading={isResetPasswordLoading}
                >
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
