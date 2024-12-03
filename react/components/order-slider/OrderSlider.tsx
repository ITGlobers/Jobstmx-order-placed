import React from 'react'
import { OrderContext } from 'vtex.order-placed'


const OrderSlider = () => {

  console.log(OrderContext, 'CONTEXTO DE ORDER')
  return (
    <div>
      <h1>
        Order Slider
      </h1>
    </div>
  )
}

export default OrderSlider
