import React from 'react';

interface MiniCartItemProps {
  image: string;
  title: string;
  price: number;
  quantity: number;
  isWishlist?: boolean;
}

const MiniCartItem: React.FC<MiniCartItemProps> = ({ image, title, price, quantity, isWishlist = false }) => {
  return (
    <li>
      <a href="product-details.html" className="image">
        <img src={image} alt="Cart product Image" />
      </a>
      <div className="content">
        <a href="product-details.html" className="title">{title}</a>
        <span className="quantity-price">
          {quantity} x <span className="amount">${price.toFixed(2)}</span>
        </span>
        <a href="#" className="remove">×</a>
      </div>
    </li>
  );
};

export default MiniCartItem; 