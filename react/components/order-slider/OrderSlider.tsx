import React, { PropsWithChildren } from 'react'
import { OrderContext } from 'vtex.order-placed'
import { ListContextProvider, useListContext } from "vtex.list-context"

import { useCssHandles } from "vtex.css-handles"
import ItemCardMap from './ItemCardMap'

interface Props {
  children: any
}


const CSS_HANDLES = ['products-section', 'products-section__title'] as const
const OrderSlider = ({ children }: PropsWithChildren<Props>) => {
  const { useOrder } = OrderContext
  const { orderId, items } = useOrder()

  // console.log('ITEMS', items)
  console.log('ORDER ID', orderId)

  const { handles } = useCssHandles(CSS_HANDLES)


  const { list } = useListContext() || []
  const itemListCard = ItemCardMap(items)
  const itemsList = list.concat(itemListCard)

  return (
    <ListContextProvider list={itemsList}>
      <div className={handles['products-section']}>
        <h2 className={handles['products-section__title']}>
          Resumen del pedido #{orderId}
        </h2>
        {children}
      </div>
    </ListContextProvider>

  )
}

export default OrderSlider
