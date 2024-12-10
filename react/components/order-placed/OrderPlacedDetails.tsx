import React from 'react';
import { useOrder } from 'vtex.order-placed/OrderContext';
import { useCssHandles } from 'vtex.css-handles';
import './OrderPlacedDetails.css';

const CSS_HANDLES = [
  'order-placed-details',
  'order-placed-details__header',
  'order-placed-details__header-payment',
  'order-placed-details__main',
  'order-placed-details__main-shipping',
  'order-placed-details__separate',
];

const OrderPlacedDetails = () => {
  const order = useOrder(); // Se asume que esto devuelve directamente los datos de la orden
  const { handles } = useCssHandles(CSS_HANDLES);

  if (!order) {
    return <p>No se encontraron detalles de la orden.</p>;
  }

  // Formato de la fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Formato de precios
  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value / 100);
  };

  // Mapeo de métodos de pago
  const paymentMethodMap = {
    Vale: "efectivo",
    DeunaNow: "Tarjeta débito - crédito",
    PayPalCheckout: "Pay Pal",
    "Mercado Pago": "Mercado Pago",
    Fintoc: "Pago por transferencia",
    "Pago en Tienda": "Efectivo"
  };

  // Definir el tipo de los métodos de pago
  type PaymentMethodKey = keyof typeof paymentMethodMap;

  // Extraer datos
  const creationDate = formatDate(order.creationDate);
  const totalValue = formatPrice(order.value);
  let paymentMethod = order.paymentData.transactions[0]?.payments[0]?.paymentSystemName || 'No especificado';
  const receiverName = order.deliveryParcels[0]?.address?.receiverName || 'No especificado';
  const address = order.deliveryParcels[0]?.address;
  const formattedAddress = address
    ? `${address.street} ${address.number}, ${address.neighborhood}, ${address.postalCode}, ${address.city}, ${address.state}`
    : 'Dirección no especificada';

  // Ajustar el método de pago con el mapeo
  if (paymentMethod !== 'No especificado') {
    paymentMethod = paymentMethodMap[paymentMethod as PaymentMethodKey] || paymentMethod;
  }

  return (
    <div className={handles['order-placed-details']}>
      <div className={handles['order-placed-details__header']}>
        <p className={handles['order-placed-details__header-payment']}>
          Fecha:
          <span>{creationDate}</span>
        </p>
        <p className={handles['order-placed-details__header-payment']}>
          Total:
          <span>{totalValue}</span>
        </p>
        <p className={handles['order-placed-details__header-payment']}>
          Forma de pago:
          <span>{paymentMethod}</span>
        </p>
      </div>
      <hr className={handles['order-placed-details__separate']} />
      <div className={handles['order-placed-details__main']}>
        <p className={handles['order-placed-details__main-shipping']}>
          Recibe:
          <span>{receiverName}</span>
        </p>
        <p className={handles['order-placed-details__main-shipping']}>
          Dirección de envío:
          <span>{formattedAddress}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderPlacedDetails;
