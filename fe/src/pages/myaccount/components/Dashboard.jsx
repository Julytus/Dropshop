import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { callLogout } from '../../../services/api';
import { doLogoutAction } from '../../../redux/account/accountSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.account.userProfile);
  const fullName = user?.full_name || 'Guest';

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
    <div className="tab-pane fade show active">
      <div className="myaccount-content dashboad">
        <p>Hello <strong>{fullName}</strong> (not <strong>{fullName}</strong>? <a href="#" onClick={handleLogout}>Log out</a>)</p>
        <p>From your account dashboard you can view your <span>recent orders</span>, manage your <span>shipping and billing addresses</span>, and <span>edit your password and account details</span>.</p>
      </div>
    </div>
  );
};

export default Dashboard; 