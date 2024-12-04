import React from 'react';
import { OrderContext } from 'vtex.order-placed'
import { useCssHandles } from 'vtex.css-handles';
import './global.css';
import './OrderPlacedHeader.css';

const CSS_HANDLES = [
  'order-placed-header',
  'order-placed-header__image',
  'order-placed-header__img',
  'order-placed-header__confirmations',
  'order-placed-header__confirmations-title',
  'order-placed-header__confirmations-text',
  'order-placed-header__confirmations-button',
  'order-placed-header__confirmations-link'
];

const OrderPlacedHeader = () => {
  console.log(OrderContext, 'CONTEXTO DE ORDER')
  const { handles } = useCssHandles(CSS_HANDLES);
  return (
    <div className={handles['order-placed-header']}>
      <div className={handles['order-placed-header__image']}>
        <img className={handles['order-placed-header__img']} src='/arquivos/cart-order-placed.png' alt='Order Placed' />
      </div>
      <div className={handles['order-placed-header__confirmations']}>
        <div className={handles['order-placed-header__confirmations-title']}>
          <p>¡Gracias por tu compra!</p>
        </div>
        <div className={handles['order-placed-header__confirmations-text']}>
          <p>No te pierdas nuestras últimas ofertas y novedades. Explorar productos</p>
        </div>
        <div className={handles['order-placed-header__confirmations-button']}>
          <a className={handles['order-placed-header__confirmations-link']} href='#'>
            Ver estatus de mi pedido
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedHeader;
