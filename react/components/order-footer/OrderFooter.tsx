import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import './OrderFooter.css';

const CSS_HANDLES = [
  'order-footer',
  'order-footer__wrapper',
  'order-footer__wrapper-logo',
  'order-footer__wrapper-networks'
];

const OrderFooter = () => {

  console.log("soy el header")
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={handles['order-footer']}>
      <div className={handles['order-footer__wrapper']}>

        <div className={handles['order-footer__wrapper-logo']}>
          <div className={handles['order-footer__wrapper-logo']}>
            <a href='#'><img src="/arquivos/order-placed-logo-footer.png" width="118" alt="" /></a>
          </div>
          <div className={handles['order-footer__wrapper-logo']}>
            <p>Saba,<br />una marca de Essity</p>
          </div>
        </div>

        <div className={handles['order-footer__wrapper-networks']}>
          <a href='https://www.facebook.com/TenaBienEstar'><img src="/arquivos/Facebook.png" width="12" alt="" /></a>
          <a href='https://www.instagram.com/masvivas/'><img src="/arquivos/Instagram.png" width="30" alt="" /></a>
          <a href=''><img src="/arquivos/twiter.png" width="26" alt="" /></a>
          <a href='https://www.youtube.com/channel/UC0HCMvbKjfj0cnpEalVlG2w'><img src="/arquivos/youtube.png" width="26" alt="" /></a>
        </div>


      </div>
    </div>
  );
};

export default OrderFooter;
