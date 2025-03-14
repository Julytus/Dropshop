import React, { useState } from 'react';

const TopBar = () => {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

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
                            <ul className="header-lan-curr">
                                <li>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setShowLanguageMenu(!showLanguageMenu);
                                    }}>
                                        {selectedLanguage}
                                    </a>
                                    {showLanguageMenu && (
                                        <ul className="curr-lan-sub-menu">
                                            <li><a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleLanguageChange('Français');
                                            }}>Français</a></li>
                                            <li><a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleLanguageChange('Deutsch');
                                            }}>Deutsch</a></li>
                                        </ul>
                                    )}
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setShowCurrencyMenu(!showCurrencyMenu);
                                    }}>
                                        {selectedCurrency}
                                    </a>
                                    {showCurrencyMenu && (
                                        <ul className="curr-lan-sub-menu">
                                            <li><a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleCurrencyChange('EUR');
                                            }}>EUR</a></li>
                                            <li><a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleCurrencyChange('GBP');
                                            }}>GBP</a></li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
