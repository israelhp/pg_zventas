import { useParams } from 'react-router-dom'
import { CustomCard } from './CustomCard'
import { useEffect, useState } from 'react'
import useCatalogActions from '../hooks/useCatalogActions'
import { Spinner, Card, RadioGroup, Radio, Input } from '@nextui-org/react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const Catalog = () => {
  const { category } = useParams()
  const [totalProducts, setTotalProducts] = useState(null)
  const [products, setProducts] = useState(null)
  const [brands, setBrands] = useState(null)
  const [prices, setPrices] = useState(null)
  const { performlistCategory, isListCategoryLoading } = useCatalogActions()
  const [priceRange, setPriceRange] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState('ALL')

  const handlePriceChange = num => {
    setPriceRange(num)
    if (num < priceRange) {
      const priceProductLower = totalProducts.filter(
        producto => producto.price <= num
      )
      setProducts(priceProductLower)
    }
    if (num > priceRange) {
      const priceProductHigher = totalProducts.filter(
        producto => producto.price <= num
      )
      setProducts(priceProductHigher)
    }
  }

  useEffect(() => {
    performlistCategory({ filter: true, category_eq: category }).then(res => {
      setPrices(res.prices)
      setPriceRange(res.prices.highestPrice)
      setBrands(res.brands)
      setProducts(res.products)
      setTotalProducts(res.products)
      if (selectedFilter !== 'ALL') {
        const specificBrandProducts = res.products.filter(
          producto => producto.brand.name === selectedFilter
        )
        setProducts(specificBrandProducts)
      }
    })
  }, [category, selectedFilter])

  return (
    <div className="w-full pt-8 lg:w-11/12 xl:lg:w-9/12 mx-auto">
      <div className="flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/12 p-4">
          <Card className="w-100 p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Filtrar por Precio</h2>
              {isListCategoryLoading ? (
                <Spinner color="default" />
              ) : prices != null ? (
                <div>
                  <Slider
                    step={10}
                    min={prices.lowestPrice}
                    max={prices.highestPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                  ></Slider>
                  <p className="text-sm">Precio: Q{priceRange}</p>
                </div>
              ) : null}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Filtrar por Marca</h2>
              <RadioGroup onValueChange={setSelectedFilter}>
                <Radio value="ALL">TODOS</Radio>
                {isListCategoryLoading ? (
                  <Spinner color="default" />
                ) : brands != null ? (
                  brands.map((item, key) => {
                    return (
                      <Radio key={key} value={item}>
                        {item}
                      </Radio>
                    )
                  })
                ) : null}
              </RadioGroup>
            </div>
          </Card>
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
