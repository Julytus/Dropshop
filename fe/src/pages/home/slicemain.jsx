import React from 'react';
import { Link } from 'react-router-dom';

const SliceMain = () => {
    return (
        <div className="section section-fluid">
            <div className="container">
                <div className="row learts-mb-n30">
                    <div className="col-lg-6 learts-mb-30">
                        <div className="sale-banner4">
                            <div className="inner">
                                <img src="assets/images/banner/sale/sale-banner4-1.webp" alt="Products Image" />
                                <div className="content">
                                    <h3 className="sub-title">Little simple things.</h3>
                                    <h2 className="title">Live out your life</h2>
                                    <Link to="/shop" className="button-banner">
                                        <img src="assets/images/banner/sale/sale-banner4-1.1.webp" alt="Sale Banner button" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 learts-mb-30">
                        <div className="row learts-mb-n30">
                            <div className="col-12 learts-mb-30">
                                <div className="sale-banner5">
                                    <Link to="#" className="inner">
                                        <img src="assets/images/banner/sale/sale-banner5-1.webp" alt="Sale Banner Image" />
                                        <div className="content">
                                            <h3 className="title">Holiday<br /> Gifts</h3>
                                            <span className="price">From $9.00</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-12 learts-mb-30">
                                <div className="sale-banner6">
                                    <div className="inner">
                                        <img src="assets/images/banner/sale/sale-banner6-1.webp" alt="Sale Banner Image" />
                                        <div className="content">
                                            <img className="icon" src="assets/images/banner/sale/sale-banner1-1.1.webp" alt="" />
                                            <h3 className="title">Spring sale</h3>
                                            <img className="price" src="assets/images/banner/sale/sale-banner6-1.1.webp" alt="" />
                                            <Link to="#" className="link">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliceMain;
