import Slider from './Slider'
import { Spinner } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { CustomCardHome } from './CustomCardHome'
import useCatalogActions from '../hooks/useCatalogActions'

const Home = () => {
  const { performlistCategory, isListCategoryLoading } = useCatalogActions()
  const [products, setProducts] = useState(null)

  useEffect(() => {
    performlistCategory({ filter: true, category_eq: 'WOOFER' }).then(res => {
      setProducts(res.products)
    })
  }, [])

  return (
    <div>
      <div className="pt-10"></div>
      <Slider />
      <h2 className="mt-8 text-2xl text-center font-semibold my-8">
        Lista de más vendidos
      </h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-4 my-4">
          {isListCategoryLoading ? (
            <Spinner color="default" />
          ) : products ? (
            products.map(item => {
              return (
                <div key={item.code} className="h-full">
                  <CustomCardHome
                    code={item.code}
                    name={item.name}
                    brand={item.brand.name}
                    price={`Q${item.price}`}
                    url={item.image.url}
                  ></CustomCardHome>
                </div>
              )
            })
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Home
