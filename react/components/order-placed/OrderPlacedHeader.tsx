import React from 'react';
import { useOrder } from 'vtex.order-placed/OrderContext';
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
  const order = useOrder(); // Se asume que esto devuelve directamente los datos de la orden
  const { handles } = useCssHandles(CSS_HANDLES);

  const paymentMethod = order.paymentData.transactions[0]?.payments[0]?.paymentSystemName || 'No especificado';
  const tid = order.paymentData.transactions[0]?.payments[0]?.connectorResponses?.Tid || 'No especificado';

  // console.log("payment method", paymentMethod);
  // console.log("tid -->", tid);

  let title = "";
  let description = "";

  if (paymentMethod === 'Pago en Tienda') {
    title = "¡Tu pedido ha sido apartado!";
    description = "Recuerda realizar el pago de tu pedido antes del 12-10-2024, sino será cancelado.";
  } else {
    title = "¡Gracias por tu compra!";
    description = "No te pierdas nuestras últimas ofertas y novedades. ";
  }

  return (
    <div className={handles['order-placed-header']}>
      <div className={handles['order-placed-header__image']}>
        <img
          className={handles['order-placed-header__img']}
          src='/arquivos/cart-order-placed.png'
          alt='Order Placed'
        />
      </div>
      <div className={handles['order-placed-header__confirmations']}>
        <div className={handles['order-placed-header__confirmations-title']}>
          <p>{title}</p>
        </div>
        <div className={handles['order-placed-header__confirmations-text']}>
          <p>{description}<a href='https://www.saba.com.mx/comprar-productos/productos-saba/'>Explorar productos</a></p>
        </div>
        {paymentMethod != 'Pago en Tienda' ? (
          <div className={handles['order-placed-header__confirmations-button']}>
            <a className={handles['order-placed-header__confirmations-link']} href='/login'>
              Ver estatus de mi pedido
            </a>
          </div>
        ) : (
          <div className={handles['order-placed-header__confirmations-button']}>
            <a
              className={handles['order-placed-header__confirmations-link']}
              href={`https://dashboard.openpay.mx/paynet-pdf/mtkrybxjau9kydpqp51k/${tid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPlacedHeader;
