import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Error404 from './error404';

const ProtectedAdminRoute = () => {
  const { isAuthenticated, userProfile } = useSelector((state) => state.account);

  if (userProfile?.role !== 'ADMIN') {
    return <Error404 />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedAdminRoute; 