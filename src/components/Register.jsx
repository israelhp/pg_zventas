import RegisterForm from './RegisterForm'

const Register = () => {
  return (
    <>
      <div className="flex justify-center items-center h-5/6">
        <div className="mt-8 flex flex-col md:flex-row w-full lg:w-1/4 md:w-1/2 justify-center gap-4 mb-12">
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </>
  )
}

export default Register
