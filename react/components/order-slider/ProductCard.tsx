import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  imageUrl: string
  quantity: number
  name: string
  detailUrl: string
}
const CSS_HANDLES = [
  "product-card",
  "product-card__image-container",
  "product-card__image",
  "product-card__info",
  "product-card__name",
  "product-card__category",
  "product-card__quantity",
  "product-card__quantity-label",
  "product-card__quantity-value"
] as const


const ProductCard = ({ imageUrl, name, quantity, detailUrl }: Props) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [category, setCategory] = useState('')

  const API_URL = `/api/catalog_system/pub/products/search${detailUrl}`

  const extractLastText = (CategoriesPaths: [string]) => {
    const lastPath = CategoriesPaths[CategoriesPaths.length - 1];
    return lastPath.replace(/\/+/g, "")
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener los datos');
          }
        })
        .then(data => {
          console.log(`${name} y su data es:`, data)
          const paths = data[0]?.categories
          setCategory(extractLastText(paths))
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    fetchData();
  }, [])

  return (
    <>
      <div className={handles['product-card__image-container']}>

        <img className={handles['product-card__image']} src={imageUrl} alt={name} />
      </div><div className={handles['product-card__info']}>
        <div className={handles['product-card__name']}>
          <div className={handles['product-card__category']}>{category}</div>
          {name}
        </div>
        <div className={handles['product-card__quantity']}>
          <span className={handles['product-card__quantity-label']}>Cantidad:</span>
          <span className={handles['product-card__quantity-value']}>{quantity}</span>
        </div>
      </div>
    </>
  )
}

export default ProductCard
