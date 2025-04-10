import React from 'react';
import MiniCartItem from './parts/MiniCartItem';
import { useOffCanvas } from './OffCanvasContext';

// Dữ liệu mẫu cho wishlist
const wishlistItems = [
  {
    id: 1,
    title: 'Walnut Cutting Board',
    image: 'assets/images/product/cart-product-1.webp',
    price: 100.00,
    quantity: 1
  },
  {
    id: 2,
    title: 'Lucky Wooden Elephant',
    image: 'assets/images/product/cart-product-2.webp',
    price: 35.00,
    quantity: 1
  },
  {
    id: 3,
    title: 'Fish Cut Out Set',
    image: 'assets/images/product/cart-product-3.webp',
    price: 9.00,
    quantity: 1
  }
];

const OffCanvasWishlist: React.FC = () => {
  const { activeOffCanvas, closeOffCanvas } = useOffCanvas();
  const isActive = activeOffCanvas === 'wishlist';

  return (
    <div id="offcanvas-wishlist" className={`offcanvas offcanvas-wishlist ${isActive ? 'offcanvas-open' : ''}`}>
      <div className="inner">
        <div className="head">
          <span className="title">Wishlist</span>
          <button className="offcanvas-close" onClick={closeOffCanvas}>×</button>
        </div>
        <div className="body customScroll">
          <ul className="minicart-product-list">
            {wishlistItems.map(item => (
              <MiniCartItem 
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                isWishlist={true}
              />
            ))}
          </ul>
        </div>
        <div className="foot">
          <div className="buttons">
            <a href="wishlist.html" className="btn btn-dark btn-hover-primary">view wishlist</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffCanvasWishlist; 