import React, { useState } from 'react';

const TopBar = () => {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setShowLanguageMenu(false);
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        setShowCurrencyMenu(false);
    };

    return (
        <div className="topbar-section section section-fluid">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-auto col-12">
                        <p className="text-center text-md-left my-2">Free shipping for orders over $59 !</p>
                    </div>
                    <div className="col-auto d-none d-md-block">
                        <div className="topbar-menu d-flex flex-row-reverse">
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-map-marker-alt"></i> Store Location
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-truck"></i> Order Status
                                    </a>
                                </li>
                                <li>
                                    <a href="/sign-in">
                                        <i className="fa fa-user"></i> SignIn
                                    </a>
                                </li>
                                <li>
                                    <a href="/sign-in">
                                        <i className="fa fa-plus"></i> SignUp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
