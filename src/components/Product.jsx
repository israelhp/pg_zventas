import { Button, Spinner, Input } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import useCatalogActions from '../hooks/useCatalogActions'
import { useEffect, useState } from 'react'
import useShoppingCartActions from '../hooks/useShoppingCartActions'

const Product = () => {
  // eslint-disable-next-line no-unused-vars
  const { category, parameter } = useParams()
  const [product, setProduct] = useState(null)
  const [amount, setAmount] = useState(1)
  const { findProduct, isGetProductLoading } = useCatalogActions()
  const { performAddProduct } = useShoppingCartActions()

  useEffect(() => {
    findProduct({ filter: true, search: parameter }).then(res => {
      setProduct(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = event => {
    const nuevoValor = event.target.value
    if (nuevoValor <= product.quantity && nuevoValor >= 1) setAmount(nuevoValor)
  }

  const handleClick = () => {
    performAddProduct({ ...product, amount })
  }

  return (
    <div className="container px-5 py-24 mx-auto">
      {isGetProductLoading ? (
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Spinner color="default" className="mx-auto" />
        </div>
      ) : product ? (
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product.image.url}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4"></div>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex pt-6">
              <span className="w-2/3 title-font font-medium text-2xl text-gray-900">
                Q{product.price}
              </span>
              <Input
                className="flex ml-auto w-2/6 mr-3"
                type="number"
                value={amount}
                onChange={handleInputChange}
              ></Input>
              <Button
                className="flex ml-auto w-2/3"
                color="primary"
                onClick={handleClick}
              >
                Comprar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Spinner color="default" className="mx-auto text-center" />
        </div>
      )}
    </div>
  )
}

export default Product
