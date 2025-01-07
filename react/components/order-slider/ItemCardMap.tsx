import React from 'react'
import { OrderItem } from '../../typings/order-slider'
import { useCssHandles } from 'vtex.css-handles'
import ProductCard from './ProductCard'


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

    const { imageUrl, quantity, name, detailUrl } = item

    return (
      <div className={handles['product-card']} key={index}>
        <ProductCard imageUrl={imageUrl} quantity={quantity} name={name} detailUrl={detailUrl} />
      </div>
    )
  })
  return listItemsMapped
}

export default ItemCardMap
