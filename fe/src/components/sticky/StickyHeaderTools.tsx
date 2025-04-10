import React from 'react';
import { useOffCanvas } from '../offcanvas/OffCanvasContext';

const StickyHeaderTools: React.FC = () => {
  const { openOffCanvas } = useOffCanvas();

  return (
    <div className="col-auto">
      <div className="header-tools justify-content-end">
        <div className="header-login d-none d-lg-block">
          <a href="my-account.html"><i className="far fa-user"></i></a>
        </div>
        <div className="header-search d-none d-sm-block d-lg-block">
          <a onClick={() => openOffCanvas('search')} style={{ cursor: 'pointer' }}>
            <i className="fas fa-search"></i>
          </a>
        </div>
        <div className="header-wishlist d-none d-sm-block d-lg-block">
          <a onClick={() => openOffCanvas('wishlist')} style={{ cursor: 'pointer' }}>
            <span className="wishlist-count">3</span>
            <i className="far fa-heart"></i>
          </a>
        </div>
        <div className="header-cart d-none d-sm-block">
          <a onClick={() => openOffCanvas('cart')} style={{ cursor: 'pointer' }}>
            <span className="cart-count">3</span>
            <i className="fas fa-shopping-cart"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyHeaderTools; 