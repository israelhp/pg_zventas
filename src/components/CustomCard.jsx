import { Card, CardHeader, Image } from '@nextui-org/react'
import { useNavigate, useLocation } from 'react-router-dom'

export const CustomCard = proms => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    navigate(`${location.pathname + '/' + proms.code}`)
  }
  return (
    <div onClick={handleClick}>
      <Card className="w-[200px] space-y-5 p-4" radius="2xl">
        <div className="h-26 rounded-lg">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt="hola"
            className="w-full object-cover"
            src={proms.url}
            isZoomed
          />
        </div>
        <div className="space-y-3">
          <CardHeader className="flex-col items-start">
            <h4 className="font-bold text-large">{proms.name}</h4>
            <p className="text-tiny uppercase font-bold">{proms.brand} </p>
            <small className="text-default-500">{proms.price}</small>
          </CardHeader>
        </div>
      </Card>
    </div>
  )
}
