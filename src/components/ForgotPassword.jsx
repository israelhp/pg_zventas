import { Input, Button } from '@nextui-org/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthActions from '../hooks/useAuthActions'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState({ result: 0, message: '' })
  const { performSendMail, isSendResetCodeLoading } = useAuthActions()

  const handleSubmit = async () => {
    if (!username) {
      setMessage({ result: -1, message: 'Ingresa tu usuario' })
    }
    const res = await performSendMail(username)

    if (res.result == 400) setMessage(res)
    if (res.result == 200) navigate(`/reset-password/${username}`)
    setUsername('')
  }

  return (
    <>
      <div className="flex justify-center items-center h-5/6">
        <div className="mt-8 flex flex-col md:flex-row w-full lg:w-1/4 md:w-1/2 justify-center gap-4 mb-12">
          <div className="bg-white p-4 md:p-8 border shadow-md shadow-blue-50 rounded-xl w-full mb-4 md:mb-0">
            <h2 className="text-xl font-semibold  mb-8">Receteo Contraseña</h2>
            <form>
              <div className="mb-4">
                <Input
                  label="User"
                  variant="bordered"
                  value={username}
                  onValueChange={setUsername}
                />
              </div>
              <div>
                <p className="text-small text-center text-red-500">
                  {message.result != 0 ? message.message : ''}
                </p>
              </div>

              <div className="mt-7 flex justify-center items-center gap-4">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  onPress={handleSubmit}
                  isLoading={isSendResetCodeLoading}
                >
                  Enviar codigo
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
