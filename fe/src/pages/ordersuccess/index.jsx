import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="section section-padding">
            <div className="container">
                <div className="order-success text-center">
                    <div className="success-icon mb-4">
                        <i className="fas fa-check-circle" style={{ fontSize: '60px', color: '#4CAF50' }}></i>
                    </div>
                    <h1 className="title mb-4">Thank you for your order!</h1>
                    <p className="message mb-4">Your order has been placed successfully.</p>
                    <p className="contact-info mb-4">We will contact you via your email address for order confirmation and shipping details.</p>
                    <div className="buttons">
                        <Link to="/" className="btn btn-dark btn-outline-hover-dark">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
