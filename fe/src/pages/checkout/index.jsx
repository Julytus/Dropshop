import React, { useState, useEffect } from 'react';
import CheckoutHeader from './components/CheckoutHeader';
import BillingDetails from './components/BillingDetails';
import OrderSummary from './components/OrderSummary';
import PaymentMethod from './components/PaymentMethod';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);
    
    return (
        <>
            <CheckoutHeader />
            <div className="section section-padding">
                <div className="container">
                    {!isLoggedIn && (
                        <div className="alert alert-info mb-4" role="alert">
                            <i className="fas fa-info-circle me-2"></i>
                            Please <Link to="/sign-in" className="alert-link">sign in</Link> to track multiple orders.
                        </div>
                    )}
                    <BillingDetails />
                    <div className="section-title2 text-center">
                        <h2 className="title">Your order</h2>
                    </div>
                    <div className="row learts-mb-n30">
                        <div className="col-lg-6 order-lg-2 learts-mb-30">
                            <OrderSummary />
                        </div>
                        <div className="col-lg-6 order-lg-1 learts-mb-30">
                            <PaymentMethod />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
