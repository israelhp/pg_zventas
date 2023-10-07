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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(isAutenticated)
  const { performLogin } = useAuthActions()

  const handleSubmit = async () => {
    await performLogin({ email, password })
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
                  type="email"
                  label="Email"
                  variant="bordered"
                  value={email}
                  onValueChange={setEmail}
                  validationState="invalid"
                  errorMessage={false ? 'hola' : ''}
                />
                <Input
                  label="Password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onValueChange={setPassword}
                />
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
                <Button color="primary" onPress={handleSubmit}>
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
