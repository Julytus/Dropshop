import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount } from '../redux/account/accountSlice';

/**
 * Component để tự động tải thông tin người dùng khi trang được tải lại
 * và cập nhật thông tin vào Redux store
 */
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  useEffect(() => {
    // Kiểm tra nếu có token trong localStorage
    const token = localStorage.getItem('token');
    
    if (token && !isAuthenticated) {
      // Nếu có token nhưng chưa xác thực trong Redux, gọi API để lấy thông tin người dùng
      dispatch(fetchAccount());
    }
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider; 