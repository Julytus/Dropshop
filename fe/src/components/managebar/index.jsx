import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const ManageBar = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Product', path: '/prod-management', icon: 'fa fa-th-large' },
    { name: 'Category', path: '/category-management', icon: 'far fa-folder' },
    { name: 'Color', path: '/color-management', icon: 'fa fa-paint-brush' },
    { name: 'Size', path: '/size-management', icon: 'fa fa-tags ' },
    { name: 'Order', path: '/order-management', icon: 'far fa-file-alt' },
    { name: 'User', path: '/user-management', icon: 'far fa-user' }
  ];

  return (
    <div className="manage-bar-wrapper">
      <div className="manage-bar-list">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`manage-bar-item ${location.pathname === tab.path ? 'active' : ''}`}
          >
            {tab.name} <i className={tab.icon}></i>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManageBar;
