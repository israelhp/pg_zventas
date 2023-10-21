export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

export function findExtremePrices(products) {
  if (products.length === 0) {
    return null // Manejo de caso especial si el array está vacío
  }

  return products.reduce((result, producto) => {
    if (!result) {
      result = { highestPrice: producto.price, lowestPrice: producto.price }
    } else {
      if (producto.price > result.highestPrice) {
        result.highestPrice = producto.price
      }
      if (producto.price < result.lowestPrice) {
        result.lowestPrice = producto.price
      }
    }
    return result
  }, null)
}
