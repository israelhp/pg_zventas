import { Input, Button } from '@nextui-org/react'
import { useState } from 'react'

const ForgotPassword = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState({ result: 0, message: '' })

  const handleSubmit = async () => {
    setUsername('')
  }

  return (
    <>
      <div className="flex justify-center items-center h-5/6">
        <div className="mt-8 flex flex-col md:flex-row w-full lg:w-1/4 md:w-1/2 justify-center gap-4 mb-12">
          <div className="bg-white p-4 md:p-8 border shadow-md shadow-blue-50 rounded-xl w-full mb-4 md:mb-0">
            <h2 className="text-xl font-semibold  mb-8">
              Cambio de contraseña
            </h2>
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
                <p className="text-small text-center">
                  {message.result != 0 ? message.message : ''}
                </p>
              </div>

              <div className="mt-7 flex justify-center items-center gap-4">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  onPress={handleSubmit}
                  isLoading={false}
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

export default ForgotPassword
