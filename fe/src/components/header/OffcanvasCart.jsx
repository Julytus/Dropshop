import React from 'react';
import { Link } from 'react-router-dom';

const OffcanvasCart = React.memo(({ isOpen, onClose }) => {
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(e);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Xử lý xóa sản phẩm khỏi giỏ hàng ở đây
    };

    return (
        <div id="offcanvas-cart" className={`offcanvas offcanvas-cart ${isOpen ? 'offcanvas-open' : ''}`}>
            <div className="inner">
                <div className="head">
                    <span className="title">Cart</span>
                    <button className="offcanvas-close" onClick={handleClose}>×</button>
                </div>
                <div className="body customScroll">
                    <ul className="minicart-product-list">
                        <li>
                            <Link to="/product-details" className="image"><img src="/assets/images/product/cart-product-1.webp" alt="Cart product Image" /></Link>
                            <div className="content">
                                <Link to="/product-details" className="title">Walnut Cutting Board</Link>
                                <span className="quantity-price">1 x <span className="amount">$100.00</span></span>
                                <a href="#" onClick={handleRemove} className="remove">×</a>
                            </div>
                        </li>
                        <li>
                            <Link to="/product-details" className="image"><img src="/assets/images/product/cart-product-2.webp" alt="Cart product Image" /></Link>
                            <div className="content">
                                <Link to="/product-details" className="title">Lucky Wooden Elephant</Link>
                                <span className="quantity-price">1 x <span className="amount">$35.00</span></span>
                                <a href="#" onClick={handleRemove} className="remove">×</a>
                            </div>
                        </li>
                        <li>
                            <Link to="/product-details" className="image"><img src="/assets/images/product/cart-product-3.webp" alt="Cart product Image" /></Link>
                            <div className="content">
                                <Link to="/product-details" className="title">Fish Cut Out Set</Link>
                                <span className="quantity-price">1 x <span className="amount">$9.00</span></span>
                                <a href="#" onClick={handleRemove} className="remove">×</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="foot">
                    <div className="sub-total">
                        <strong>Subtotal :</strong>
                        <span className="amount">$144.00</span>
                    </div>
                    <div className="buttons">
                        <Link to="/shopping-cart" className="btn btn-dark btn-hover-primary">view cart</Link>
                        <Link to="/checkout" className="btn btn-outline-dark">checkout</Link>
                    </div>
                    <p className="minicart-message">Free Shipping on All Orders Over $100!</p>
                </div>
            </div>
        </div>
    );
});

export default OffcanvasCart; 