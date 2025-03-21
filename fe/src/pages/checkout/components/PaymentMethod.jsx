import React from 'react';

const PaymentMethod = () => {
    return (
        <div className="order-payment">
            <div className="payment-method">
                <div className="accordion" id="paymentMethod">
                    <div className="card active">
                        <div className="card-header">
                            <button data-bs-toggle="collapse" data-bs-target="#checkPayments">Check payments</button>
                        </div>
                        <div id="checkPayments" className="collapse show" data-bs-parent="#paymentMethod">
                            <div className="card-body">
                                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <button data-bs-toggle="collapse" data-bs-target="#cashkPayments">Cash on delivery</button>
                        </div>
                        <div id="cashkPayments" className="collapse" data-bs-parent="#paymentMethod">
                            <div className="card-body">
                                <p>Pay with cash upon delivery.</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <button data-bs-toggle="collapse" data-bs-target="#payPalPayments">
                                PayPal <img src="assets/images/others/pay-2.webp" alt="PayPal" />
                            </button>
                        </div>
                        <div id="payPalPayments" className="collapse" data-bs-parent="#paymentMethod">
                            <div className="card-body">
                                <p>Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="payment-note">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                <button className="btn btn-dark btn-outline-hover-dark">Place order</button>
            </div>
        </div>
    );
};

export default PaymentMethod; 