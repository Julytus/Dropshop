import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const TopBar = () => {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.account.userProfile);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setShowLanguageMenu(false);
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        setShowCurrencyMenu(false);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await callLogout();
            dispatch(doLogoutAction());
            localStorage.removeItem('token');
            navigate('/sign-in');
        } catch (error) {
            console.error('Logout failed:', error);
        }
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
                                {user.fullName!="" ? (
                                    <>
                                        <li>
                                            <Link to="/my-account">
                                                <i className="fa fa-user"></i> {user.full_name}
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" onClick={handleLogout}>
                                                <i className="fa fa-sign-out-alt"></i> Logout
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/sign-in">
                                                <i className="fa fa-user"></i> SignIn
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/sign-in">
                                                <i className="fa fa-plus"></i> SignUp
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
