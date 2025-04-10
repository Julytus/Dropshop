import React from 'react';
import MiniCartItem from './parts/MiniCartItem';
import { useOffCanvas } from './OffCanvasContext';

// Dữ liệu mẫu cho cart
const cartItems = [
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

// Tính tổng giá trị giỏ hàng
const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const OffCanvasCart: React.FC = () => {
  const subtotal = calculateTotal();
  const { activeOffCanvas, closeOffCanvas } = useOffCanvas();
  const isActive = activeOffCanvas === 'cart';

  return (
    <div id="offcanvas-cart" className={`offcanvas offcanvas-cart ${isActive ? 'offcanvas-open' : ''}`}>
      <div className="inner">
        <div className="head">
          <span className="title">Cart</span>
          <button className="offcanvas-close" onClick={closeOffCanvas}>×</button>
        </div>
        <div className="body customScroll">
          <ul className="minicart-product-list">
            {cartItems.map(item => (
              <MiniCartItem 
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </ul>
        </div>
        <div className="foot">
          <div className="sub-total">
            <strong>Subtotal :</strong>
            <span className="amount">${subtotal.toFixed(2)}</span>
          </div>
          <div className="buttons">
            <a href="shopping-cart.html" className="btn btn-dark btn-hover-primary">view cart</a>
            <a href="checkout.html" className="btn btn-outline-dark">checkout</a>
          </div>
          <p className="minicart-message">Free Shipping on All Orders Over $100!</p>
        </div>
      </div>
    </div>
  );
};

export default OffCanvasCart; 