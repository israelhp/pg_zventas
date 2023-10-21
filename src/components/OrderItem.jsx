import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import { EyeIcon } from './Icons'

const columns = [
  { name: 'PRODUCTO', uid: 'code' },
  { name: 'CANTIDAD', uid: 'quantity' },
  { name: 'SUBTOTAL', uid: 'price' }
]
export default function OrderItem(proms) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>
        <EyeIcon onPress={onOpen} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Detalle</ModalHeader>
              <ModalBody>
                <Table aria-label="shopping-cart">
                  <TableHeader columns={columns}>
                    {column => (
                      <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody>
                    {proms.list.map((product, key) => {
                      return (
                        <TableRow key={key}>
                          <TableCell>{product.code} </TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>Q{product.price}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
                <Table aria-label="shopping-cart">
                  <TableHeader>
                    <TableColumn>total</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Q{proms.total} </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
