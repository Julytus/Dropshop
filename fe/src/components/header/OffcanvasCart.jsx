import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, updateCartItemQuantity } from '../../services/cartService';
import { getProductById } from '../../services/api';
import '../../styles/cart.css';

const OffcanvasCart = React.memo(({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});

    useEffect(() => {
        const loadCartItems = async () => {
            const items = getCart();
            setCartItems(items);
            
            // Load product details for each item
            const productPromises = items.map(item => 
                getProductById(item.id)
                    .then(response => ({
                        id: item.id,
                        data: response.data
                    }))
                    .catch(error => {
                        console.error(`Error loading product ${item.id}:`, error);
                        return null;
                    })
            );

            const productResults = await Promise.all(productPromises);
            const productMap = {};
            productResults.forEach(result => {
                if (result) {
                    productMap[result.id] = result.data;
                }
            });
            setProducts(productMap);
            setLoading(false);
        };

        if (isOpen) {
            loadCartItems();
        }
    }, [isOpen]);

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(e);
    };

    const handleRemove = (e, productId, size, color) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedCart = removeFromCart(productId, size, color);
        setCartItems(updatedCart);
    };

    const handleQuantityChange = (productId, size, color, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = updateCartItemQuantity(productId, size, color, newQuantity);
        setCartItems(updatedCart);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const product = products[item.id];
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    };

    if (loading) {
        return (
            <div id="offcanvas-cart" className={`offcanvas offcanvas-cart ${isOpen ? 'offcanvas-open' : ''}`}>
                <div className="inner">
                    <div className="head">
                        <span className="title">Cart</span>
                        <button className="offcanvas-close" onClick={handleClose}>×</button>
                    </div>
                    <div className="body customScroll">
                        <div className="text-center">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="offcanvas-cart" className={`offcanvas offcanvas-cart ${isOpen ? 'offcanvas-open' : ''}`}>
            <div className="inner">
                <div className="head">
                    <span className="title">Cart</span>
                    <button className="offcanvas-close" onClick={handleClose}>×</button>
                </div>
                <div className="body customScroll">
                    <ul className="minicart-product-list">
                        {cartItems.map((item, index) => {
                            const product = products[item.id];
                            if (!product) return null;

                            return (
                                <li key={`${item.id}-${item.size}-${item.color}`}>
                                    <Link to={`/product-detail/${item.id}`} className="image">
                                        <img src={product.image_url} alt={product.name} 
                                        style={{ width: '115px', height: '140px', objectFit: 'cover' }}
                                        className="cart-product-image" />
                                    </Link>
                                    <div className="content">
                                        <Link to={`/product-detail/${item.id}`} className="title">
                                            {product.name}
                                        </Link>
                                        <div className="quantity-price">
                                            <div className="quantity">
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                                                    className="qty-btn"
                                                >-</button>
                                                <span>{item.quantity}</span>
                                                <button 
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                                                    className="qty-btn"
                                                >+</button>
                                            </div>
                                            <span className="amount">${(product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="product-variants">
                                            {item.size && <span>Size: {item.size}</span>}
                                            <div></div>
                                            {item.color && <span>Color: {item.color}</span>}
                                        </div>
                                        <a 
                                            href="#" 
                                            onClick={(e) => handleRemove(e, item.id, item.size, item.color)} 
                                            className="remove"
                                        >×</a>
                                    </div>
                                </li>
                            );
                        })}
                        {cartItems.length === 0 && (
                            <li className="text-center">Your cart is empty</li>
                        )}
                    </ul>
                </div>
                <div className="foot">
                    <div className="sub-total">
                        <strong>Subtotal :</strong>
                        <span className="amount">${calculateSubtotal().toFixed(2)}</span>
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