import React from 'react';
import { Link } from 'react-router-dom';

const OffcanvasWishlist = React.memo(({ isOpen, onClose }) => {
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(e);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Xử lý xóa sản phẩm khỏi wishlist ở đây
    };

    return (
        <div id="offcanvas-wishlist" className={`offcanvas offcanvas-wishlist ${isOpen ? 'offcanvas-open' : ''}`}>
            <div className="inner">
                <div className="head">
                    <span className="title">Wishlist</span>
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
                    <div className="buttons">
                        <Link to="/wishlist" className="btn btn-dark btn-hover-primary">view wishlist</Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default OffcanvasWishlist; 