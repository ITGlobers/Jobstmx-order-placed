import React from 'react'
import { OrderItem } from '../../typings/order-slider'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  "product-card",
  "product-card__image-container",
  "product-card__image",
  "product-card__info",
  "product-card__name",
  "product-card__quantity",
  "product-card__quantity-label",
  "product-card__quantity-value"
] as const
const ItemCardMap = (items: OrderItem[]) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const listItemsMapped = items?.map((item, index) => {

    const { imageUrl, quantity, name } = item

    return (
      <div className={handles['product-card']} key={index}>
        <div className={handles['product-card__image-container']}>
          <img className={handles['product-card__image']} src={imageUrl} alt={name} />
        </div>
        <div className={handles['product-card__info']}>
          <div className={handles['product-card__name']}>
            {name}
          </div>
          <div className={handles['product-card__quantity']}>
            <span className={handles['product-card__quantity-label']}>Cantidad:</span>
            <span className={handles['product-card__quantity-value']}>{quantity}</span>
          </div>
        </div>
      </div>
    )
  })
  return listItemsMapped
}

export default ItemCardMap
