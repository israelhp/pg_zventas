const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
          reservados.
        </p>
        <div className="mt-4 flex justify-center">
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Contacto
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
