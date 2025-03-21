import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutHeader = () => {
    return (
        <div className="page-title-section section" data-bg-image="assets/images/bg/page-title-1.webp" style={{ backgroundImage: 'url("assets/images/bg/page-title-1.webp")' }}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="page-title">
                            <h1 className="title">Checkout</h1>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Checkout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutHeader; 