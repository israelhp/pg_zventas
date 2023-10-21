import React from 'react'
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'

const Information = () => {
  return (
    <div className="p-4">
      <Card className="p-4 mt-10">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            4ta Av 7-29 Montserrat Zona 4 de Mixco
          </p>
          <small className="text-default-500">46338500</small>
          <h4 className="font-bold text-large">Lunes a viernes 8:30 a 18:00</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3860.891421987401!2d-90.54782522489374!3d14.605260585881688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDM2JzE4LjkiTiA5MMKwMzInNDIuOSJX!5e0!3m2!1ses!2sgt!4v1697855360879!5m2!1ses!2sgt"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </CardBody>
      </Card>
    </div>
  )
}

export default Information
