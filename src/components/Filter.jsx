import { Card, Spinner } from '@nextui-org/react'
import { useEffect } from 'react'

export function Filters(proms) {
  useEffect(() => {}, [])
  return (
    <Card className="w-100 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Filtrar por Precio</h2>
        <input type="range" min="0" max="100" step="10" className="w-full" />
        {proms.isLoading ? (
          <Spinner color="default" />
        ) : proms.prices != null ? (
          <p className="text-sm">
            Precio: Q{proms.prices.lowestPrice} - Q{proms.prices.highestPrice}{' '}
          </p>
        ) : null}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Filtrar por Marca</h2>
        {proms.isLoading ? (
          <Spinner color="default" />
        ) : proms.brands != null ? (
          proms.brands.map((item, key) => {
            return (
              <label key={key} className="flex items-center mb-2">
                <input type="checkbox" value="Marca 1" className="mr-2" />{' '}
                {item}
              </label>
            )
          })
        ) : null}
      </div>
    </Card>
  )
}
