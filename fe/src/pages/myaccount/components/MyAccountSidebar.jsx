import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callLogout } from '../../../services/api';
import { doLogoutAction } from '../../../redux/account/accountSlice';

const MyAccountSidebar = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="myaccount-tab-list nav">
      <a 
        href="#" 
        className={activeTab === 'dashboard' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('dashboard');
        }}
      >
        Dashboard <i className="far fa-home"></i>
      </a>
      <a 
        href="#" 
        className={activeTab === 'orders' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('orders');
        }}
      >
        Orders <i className="far fa-file-alt"></i>
      </a>
      <a 
        href="#" 
        className={activeTab === 'address' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('address');
        }}
      >
        Address (Comming Soon) <i className="far fa-map-marker-alt"></i>
      </a>
      <a 
        href="#" 
        className={activeTab === 'account-info' ? 'active' : ''} 
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('account-info');
        }}
      >
        Account Details <i className="far fa-user"></i>
      </a>
      <a href="#" onClick={handleLogout}>Logout <i className="far fa-sign-out-alt"></i></a>
    </div>
  );
};

export default MyAccountSidebar; 