import { Input, Button } from '@nextui-org/react'

const RegisterForm = () => {
  return (
    <div className="bg-white p-4 md:p-8 border shadow-md shadow-blue-50 rounded-xl w-full mb-4 md:mb-0">
      <h2 className="text-xl font-semibold  mb-8">Registrate</h2>
      <form>
        <div className="mb-4">
          <Input
            autoFocus
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
        </div>
        <div className="mb-8">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
        </div>
        <div className="mt-7 flex justify-center items-center gap-4">
          <Button color="primary">Iniciar sesion</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
