import React from 'react';
import { OrderContext } from 'vtex.order-placed'
import './global.css';
import styles from './OrderPlacedHeader.module.css';

const OrderPlacedHeader = () => {
  console.log(OrderContext, 'CONTEXTO DE ORDER')
  return (
    <div className={styles['order-placed-header']}>
      <div className={styles['order-placed-header__image']}>
        <img className={styles['order-placed-header__img']} src='/arquivos/cart-order-placed.png' alt='Order Placed' />
      </div>
      <div className={styles['order-placed-header__confirmations']}>
        <div className={styles['order-placed-header__confirmations-title']}>
          <p>¡Gracias por tu compra!</p>
        </div>
        <div className={styles['order-placed-header__confirmations-text']}>
          <p>No te pierdas nuestras últimas ofertas y novedades. Explorar productos</p>
        </div>
        <div className={styles['order-placed-header__confirmations-button']}>
          <a className={styles['order-placed-header__confirmations-link']} href='#'>
            Ver estatus de mi pedido
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedHeader;
