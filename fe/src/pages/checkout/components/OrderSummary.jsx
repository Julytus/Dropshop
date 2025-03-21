import React, { useState, useEffect } from 'react';
import { getProductById } from '../../../services/api';

const OrderSummary = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState({});

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const cartData = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
        setCartItems(cartData);

        // Lấy thông tin sản phẩm từ API
        const fetchProducts = async () => {
            const productsData = {};
            for (const item of cartData) {
                try {

                    const productData = await getProductById(item.id);
                    productsData[item.id] = productData;
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
            setProducts(productsData);
        };

        fetchProducts();
    }, []);

    const subtotal = cartItems.reduce((total, item) => {
        const product = products[item.id];
        return total + (product?.data.price || 0) * item.quantity;
    }, 0);
    
    const total = subtotal;

    return (
        <>
            <div className="section-title2">
                <h2 className="title">Your order</h2>
            </div>
            <div className="order-review learts-mb-50">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="name">Product</th>
                            <th className="total">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => {
                            const product = products[item.id];
                            return (
                                <tr key={`${item.id}-${item.size}-${item.color}`}>
                                    <td className="name">
                                        {product?.data.name || 'Unknown Product'}&nbsp;
                                        <strong className="quantity">×&nbsp;{item.quantity}</strong>
                                        {item.size && <span className="text-muted"> - Size: {item.size}</span>}
                                        {item.color && <span className="text-muted"> - Color: {item.color}</span>}
                                    </td>
                                    <td className="total">
                                        <span>${((product?.data.price || 0) * item.quantity).toFixed(2)}</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="subtotal">
                            <th>Subtotal</th>
                            <td><span>${subtotal.toFixed(2)}</span></td>
                        </tr>
                        <tr className="total">
                            <th>Total</th>
                            <td><strong><span>${total.toFixed(2)}</span></strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
};

export default OrderSummary; 