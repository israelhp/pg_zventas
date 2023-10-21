import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Chip,
  Spinner
} from '@nextui-org/react'
import useOrderActions from '../hooks/useOrderActions'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store'
import OrderItem from './OrderItem'
import { useNavigate } from 'react-router-dom'

const columns = [
  { name: 'PEDIDO', uid: 'order' },
  { name: 'ESTADO', uid: 'status' },
  { name: 'TOTAL', uid: 'total' },
  { name: 'DETALLE', uid: 'actions' }
]

const statusColorMap = {
  O: 'success',
  C: 'danger'
}

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState(null)
  const { performListOrders, isListOrdersLoading } = useOrderActions()
  const isAutenticated = useAppSelector(state => state.auth)

  useEffect(() => {
    if (!isAutenticated.isAuthenticated) navigate('/')
    else {
      performListOrders(isAutenticated.token).then(res => {
        setOrders(res)
      })
    }
  }, [isAutenticated])

  return (
    <div className="p-9 flex flex-col justify-center items-center">
      {orders === null ? (
        <Spinner color="default" />
      ) : (
        <Table aria-label="shopping-cart">
          <TableHeader columns={columns}>
            {column => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {orders.map((order, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>
                    <User
                      name={order._id}
                      avatarProps={{
                        radius: 'md',
                        src: 'https://icons.veryicon.com/png/o/miscellaneous/fu-jia-intranet/product-29.png'
                      }}
                    ></User>
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={statusColorMap[order.status]}
                      size="sm"
                      variant="flat"
                    >
                      {order.status === 'O' ? 'Activo' : 'Cancelado'}
                    </Chip>
                  </TableCell>
                  <TableCell>Q{order.subtotal}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Detalle del producto">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <OrderItem
                            list={order.lines}
                            total={order.subtotal}
                          ></OrderItem>
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default Orders
