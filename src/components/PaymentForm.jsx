import { useState } from 'react'
import useOrderActions from '../hooks/useOrderActions'
import { useAppSelector } from '../hooks/store'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import useShoppingCartActions from '../hooks/useShoppingCartActions'
const PaymentForm = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState({ code: 0, message: '' })
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [nit, setNIT] = useState('')
  const [name, setName] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVC, setCardCVC] = useState('')
  const isAutenticated = useAppSelector(state => state.auth)
  const cartItemsCount = useAppSelector(state => state.shoppingCart)
  const { onOpen, onOpenChange } = useDisclosure()
  const { performOrder, isAddOrderLoading } = useOrderActions()
  const { performRemoveAllProducts } = useShoppingCartActions()

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.value)
  }

  const onCloseModal = () => {
    setIsOpen(false)
    performRemoveAllProducts()
    navigate('/')
  }

  const handleSubmit = e => {
    e.preventDefault()
    const subtotal = cartItemsCount.products.reduce(
      (accumulator, product) => accumulator + product.amount * product.price,
      0
    )
    const discount = cartItemsCount.products.reduce(
      (accumulator, product) => accumulator + product.discount,
      0
    )

    const tax = cartItemsCount.products.reduce(
      (accumulator, product) => accumulator + product.tax,
      0
    )
    const deliveryAmount = 25
    const grandTotal = subtotal + deliveryAmount + tax - discount
    const pay =
      paymentMethod === 'credit-card'
        ? {
            type: 'Card',
            amount: grandTotal,
            Card: { number: cardNumber, bin: cardCVC }
          }
        : { type: 'Cash', amount: grandTotal, Card: null }
    performOrder({
      token: isAutenticated.token,
      data: {
        subtotal: subtotal,
        discount: discount,
        deliveryAmount: deliveryAmount,
        tax: tax,
        grandTotal: grandTotal,
        status: 'O',
        lines: cartItemsCount.products.map((product, key) => {
          return {
            lineNum: key,
            code: product.code,
            description: product.description,
            quantity: product.amount,
            discount: product.discount,
            price: product.price,
            iva: true,
            tax: product.tax
          }
        }),
        payment: pay
      }
    }).then(res => {
      if (res.data.code === 200) {
        setMessage({
          code: res.data.code,
          message: 'Orden ingresada con exito'
        })
        setIsOpen(true)
      }
    })
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Modal isOpen={isOpen}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Pedido</ModalHeader>
            <ModalBody>
              <p>{message.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onCloseModal}>
                Regresar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Dirección:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ingresa tu dirección"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Teléfono:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ingresa tu número de teléfono"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nit" className="block text-gray-700 font-bold mb-2">
              NIT:
            </label>
            <input
              type="text"
              id="nit"
              name="nit"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ingresa tu NIT"
              value={nit}
              onChange={e => setNIT(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Método de Pago:
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={handlePaymentMethodChange}
                  className="mr-1"
                />
                Tarjeta de Crédito
              </label>
              <label>
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                  className="mr-1"
                />
                Efectivo
              </label>
            </div>
          </div>

          {paymentMethod === 'credit-card' && (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Número de Tarjeta:
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingresa el número de tu tarjeta de crédito"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cardName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nombre en la Tarjeta:
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingresa el nombre en la tarjeta de crédito"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cardExpiry"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Fecha de Expiración:
                </label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={e => setCardExpiry(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cardCVC"
                  className="block text-gray-700 font-bold mb-2"
                >
                  CVC (Código de Seguridad):
                </label>
                <input
                  type="text"
                  id="cardCVC"
                  name="cardCVC"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingresa el CVC"
                  value={cardCVC}
                  onChange={e => setCardCVC(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-center col-span-2">
          <Button
            type="submit"
            isLoading={isAddOrderLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline"
            onPress={onOpen}
          >
            Finalizar Pedido
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PaymentForm
