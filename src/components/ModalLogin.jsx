import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Divider
} from '@nextui-org/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../hooks/store'
import useAuthActions from '../hooks/useAuthActions'

const ModalLogin = () => {
  const isAutenticated = useAppSelector(state => state.auth.isAuthenticated)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ id: 0, message: '' })

  const { performLogin, isLoginLoading } = useAuthActions()

  const handleSubmit = async () => {
    const error = validateInputs(username, password)

    if (Object.keys(error).length > 0) {
      setErrors({
        id: 1,
        message: error.message
      })
      return
    }

    const result = await performLogin({
      username,
      password,
      grant_type: 'password'
    })

    if (result)
      setErrors({
        id: 1,
        message: result
      })
  }

  function validateInputs() {
    const error = {}
    if (!password)
      error.message = 'El campo de contraseña no puede estar vacío.'

    if (!username)
      error.message = 'El campo de correo electrónico no puede estar vacío.'

    return error
  }

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">
        Login
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Username"
                  variant="bordered"
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  label="Password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onValueChange={setPassword}
                />
                <div>
                  <p className="text-small text-center text-red-600">
                    {errors.id != 0 ? errors.message : ''}
                  </p>
                </div>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: 'text-small'
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <Divider></Divider>
                <div>
                  <p className="text-small">
                    ¿No tienes cuenta?
                    <Button
                      as={NavLink}
                      color="primary"
                      to="/register"
                      variant="light"
                      onPress={onClose}
                    >
                      Registrate
                    </Button>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isLoading={isLoginLoading}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalLogin
