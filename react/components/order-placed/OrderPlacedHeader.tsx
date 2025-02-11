import React, { useEffect } from 'react';
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

declare global {
  interface Window {
    dataLayer: any[];
  }
}


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

// ------------------------------------------- DataLayer OrderPlaced  ------------------------------------------- //

useEffect(() => {
  if (!order || !order.paymentData.transactions[0]?.transactionId) return // Verifica si `order` está disponible antes de continuar

  // Función para encriptar los datos con SHA-256
  const hashData = async (data: string) => {
    if (!data) return '' // Evita errores con valores undefined o null
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
  }

  // Obtener los datos del usuario y encriptarlos
  const getUserData = async () => {
    const userData = {
      nombre: order.clientProfileData?.firstName || '',
      apellido: order.clientProfileData?.lastName || '',
      celular: order.clientProfileData?.phone || '',
      correo: order.clientProfileData?.email || '',
      ciudad: order.deliveryParcels?.[0]?.address?.city || '',
    }

    return {
      nombre: await hashData(userData.nombre),
      apellido: await hashData(userData.apellido),
      celular: await hashData(userData.celular),
      correo: await hashData(userData.correo),
      ciudad: await hashData(userData.ciudad),
    }
  }

  // Verifica si la dataLayer está disponible
  if (window.dataLayer) {
    const items = order.items.map((item: any) => ({
      item_id: item.id,
      item_name: item.name,
      coupon: item.coupon || '',
      discount: (item.discount || 0) / 100,
      affiliation: 'Saba',
      item_brand: item.brand,
      item_category: item.category,
      item_variant: item.variant,
      price: item.price / 100, // Asegura que esté en formato correcto
      currency: 'MXN',
      quantity: item.quantity,
    }))

    const formatCurrency = (value: number) =>
      new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(value / 100)

    // Obtén los datos encriptados del usuario y empuja al dataLayer
    getUserData().then(encryptedUserData => {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          affiliation: 'Online store',
          coupon: '',
          currency: 'MXN',
          items,
          flow_type:
            order.paymentData?.transactions[0]?.payments[0]?.paymentSystemName === 'Pago en Tienda'
              ? 'apartado'
              : 'compra',
          transaction_id: order.paymentData.transactions[0]?.transactionId,
          value: order.value / 100,
          tax: order.totals?.find((t: any) => t.id === 'Tax')?.value / 100 || 0,
          shipping: formatCurrency(order.deliveryParcels?.[0]?.price || 0),
          user_data: encryptedUserData,
          log_status: order.clientProfileData?.isAuthenticated ? 'Yes' : 'No',
        },
      })
    })
  }
}, [order])

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
