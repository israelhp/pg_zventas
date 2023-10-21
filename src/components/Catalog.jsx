import { useParams } from 'react-router-dom'
import { CustomCard } from './CustomCard'
import { Filters } from './Filter'
import { useEffect, useState } from 'react'
import useCatalogActions from '../hooks/useCatalogActions'
import { Spinner } from '@nextui-org/react'

const Catalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState(null)
  const [brands, setBrands] = useState(null)
  const [prices, setPrices] = useState(null)
  const { performlistCategory, isListCategoryLoading } = useCatalogActions()

  useEffect(() => {
    performlistCategory({ filter: true, category_eq: category }).then(res => {
      setPrices(res.prices)
      setBrands(res.brands)
      setProducts(res.products)
    })
  }, [category])
  return (
    <div className="w-full pt-8 lg:w-11/12 xl:lg:w-9/12 mx-auto">
      <div className="flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/12 p-4">
          <Filters
            brands={brands}
            prices={prices}
            isLoading={isListCategoryLoading}
          />
        </div>
        <div className="w-full lg:w-9/12 flex justify-center items-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-4 my-4">
            {isListCategoryLoading ? (
              <Spinner color="default" />
            ) : products ? (
              products.map(item => {
                return (
                  <CustomCard
                    key={item.code}
                    code={item.code}
                    name={item.name}
                    brand={item.brand.name}
                    price={`Q${item.price}`}
                    url={item.image.url}
                  ></CustomCard>
                )
              })
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog
