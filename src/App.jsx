import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

const ShoppingCart = lazy(() => import('./components/ShoppingCart'))
const NotFound = lazy(() => import('./components/NotFound'))
const Home = lazy(() => import('./components/Home'))
const Catalog = lazy(() => import('./components/Catalog'))
const Register = lazy(() => import('./components/Register'))
const Information = lazy(() => import('./components/Information'))

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className="bg-zinc-50">
        <div className="container mx-auto h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/information" element={<Information />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
