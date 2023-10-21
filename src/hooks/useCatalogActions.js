import {
  useListCategoryMutation,
  useGetProductMutation
} from '../store/api/catalog-api'
import { findExtremePrices } from '../utils/utils'

const useCatalogActions = () => {
  const [
    listCategory,
    {
      isLoading: isListCategoryLoading,
      isError: isListCategoryError,
      error: listCategoryError
    }
  ] = useListCategoryMutation()

  const [
    getProduct,
    {
      isLoading: isGetProductLoading,
      isError: isGetProductError,
      error: getProductError
    }
  ] = useGetProductMutation()

  const performlistCategory = async data => {
    try {
      const res = await listCategory(data).unwrap()

      const uniqueBrands = res.data.reduce((brands, product) => {
        const nombreMarca = product.brand.name
        if (!brands[nombreMarca]) {
          brands[nombreMarca] = true
        }
        return brands
      }, {})
      const uniqueBrandsArray = Object.keys(uniqueBrands)

      const prices = findExtremePrices(res.data)
      return { brands: uniqueBrandsArray, products: res.data, prices: prices }
    } catch (e) {
      console.error(e)
    }
  }

  const findProduct = async data => {
    try {
      const res = await getProduct(data).unwrap()
      return { code: res.code, data: res.data[0] }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    performlistCategory,
    findProduct,
    isListCategoryLoading,
    isGetProductLoading,
    isListCategoryError,
    isGetProductError,
    listCategoryError,
    getProductError
  }
}

export default useCatalogActions
