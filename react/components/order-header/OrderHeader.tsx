import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './OrderHeader.css';

const CSS_HANDLES = [
  'order-header'
];

const OrderHeader = () => {

  console.log("soy el header")
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={handles['order-header']}>
      <a href="https://saba.com.mx/">
        <img src="/arquivos/FemCareLRbrandmark flexo_Saba_02_LR.png" />
      </a>
    </div>
  );
};

export default OrderHeader;
