import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Input,
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card
} from '@nextui-org/react'
import { EyeIcon, DeleteIcon } from './Icons'
import { useAppSelector } from '../hooks/store'
import { useNavigate } from 'react-router-dom'
import useShoppingCartActions from '../hooks/useShoppingCartActions'
import { useEffect } from 'react'

const columns = [
  { name: 'PRODUCTO', uid: 'name' },
  { name: 'CANTIDAD', uid: 'role' },
  { name: 'SUBTOTAL', uid: 'status' },
  { name: 'ACTIONES', uid: 'actions' }
]

// TODO: Mostar Detalle
const ShoppingCart = () => {
  const navigate = useNavigate()
  const cartItemsCount = useAppSelector(state => state.shoppingCart)
  const isAutenticated = useAppSelector(state => state.auth.isAuthenticated)
  const { performRemoveProduct, performUpdateProduct } =
    useShoppingCartActions()
  const total = cartItemsCount.products.reduce(
    (accumulator, product) => accumulator + product.amount * product.price,
    0
  )

  useEffect(() => {}, [cartItemsCount])

  const handleClickRemoveProduct = product => {
    performRemoveProduct(product)
  }

  const handleClickDetailProduct = product => {
    navigate(`/catalog/${product.category.name}/${product.code}`)
  }
  const handleClick = () => {
    if (isAutenticated) {
      navigate('/payment')
    }
  }

  const handleOnChangeInput = (e, product) => {
    if (e.target.value >= 1) {
      const updateProduct = product
      const productoAModificar = { ...updateProduct, amount: e.target.value }
      performUpdateProduct(productoAModificar)
    }
  }

  return (
    <div className="p-9 flex flex-col justify-center items-center">
      <Table aria-label="shopping-cart">
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.uid}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody>
          {cartItemsCount.products.map((product, key) => {
            return (
              <TableRow key={key}>
                <TableCell>
                  <User
                    avatarProps={{ radius: 'lg', src: product.image.url }}
                    description={product.description}
                    name={product.name}
                  >
                    {product.name}
                  </User>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={product.amount}
                    onChange={e => handleOnChangeInput(e, product)}
                  ></Input>
                </TableCell>
                <TableCell>Q{product.amount * product.price}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Detalle del producto">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon
                          onClick={() => handleClickDetailProduct(product)}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar producto">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon
                          onClick={() => handleClickRemoveProduct(product)}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex justify-end items-center mt-4 w-full">
        <Card className="p-6 flex flex-row gap-4 items-center">
          <div className="">
            <strong>Total:</strong> Q{total}
          </div>
          <div className="">
            {isAutenticated ? (
              <Button className="w-full" color="primary" onClick={handleClick}>
                Continuar
              </Button>
            ) : (
              <Popover placement="right">
                <PopoverTrigger>
                  <Button>Continuar</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Para continuar</div>
                    <div className="text-tiny">Debes iniciar sesion</div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ShoppingCart
