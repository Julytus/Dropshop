import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callLogin, callRegister, fetchProfile } from '../../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const LoginRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State cho form đăng nhập
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // State cho form đăng ký
  const [registerData, setRegisterData] = useState({
    email: '',
    fullName: '',
    password: '',
    retype: ''
  });

  // State cho error
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  
  // State cho loading
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Handlers cho form đăng nhập
  const handleLoginChange = (e) => {
    const { name, value, checked, type } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Xóa lỗi khi người dùng thay đổi input
    setLoginError('');
  };

  // Handlers cho form đăng ký
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    // Xóa lỗi khi người dùng thay đổi input
    setRegisterError('');
  };

  // Logic đăng nhập
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      // Gọi API đăng nhập
      const response = await callLogin({
        email: loginData.email,
        password: loginData.password
      });
      
      // Lưu token vào localStorage
      if (response?.data?.access_token) {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        
        try {
          // Lấy thông tin profile và cập nhật redux store
          const profileResponse = await fetchProfile();
          if (profileResponse && profileResponse.data) {
            dispatch(doLoginAction(profileResponse.data));
            
            // Thông báo thành công
            toast.success('Đăng nhập thành công!');
            
            // Chuyển hướng về trang chủ
            navigate('/');
          }
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          const errorMessage = 'Không thể lấy thông tin người dùng. Vui lòng thử lại.';
          setLoginError(errorMessage);
          toast.error(errorMessage);
          // Xóa token nếu không lấy được profile
          localStorage.removeItem('token');
        }
      } else {
        throw new Error('Token không hợp lệ');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Xử lý lỗi
      let errorMessage = '';
      
      if (error.response?.status === 401) {
        errorMessage = 'Sai tài khoản hoặc mật khẩu';
      } else {
        errorMessage = error.response?.data?.error || 'Đã xảy ra lỗi trong quá trình đăng nhập';
      }
      
      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logic đăng ký
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegisterError('');
    
    // Kiểm tra mật khẩu nhập lại
    if (registerData.password !== registerData.retype) {
      setRegisterError('Mật khẩu nhập lại không khớp');
      setIsRegistering(false);
      return;
    }
    
    try {
      // Gọi API đăng ký
      const response = await callRegister({
        email: registerData.email,
        password: registerData.password,
        fullName: registerData.fullName
      });
      
      // Xử lý response thành công
      if (response && response.code === 201) {
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        
        // Reset form đăng ký
        setRegisterData({
          email: '',
          fullName: '',
          password: '',
          retype: ''
        });
      }
    } catch (error) {
      console.error('Register error:', error);
      
      // Xử lý các loại lỗi khác nhau
      if (error.response?.data?.detail === "User existed") {
        setRegisterError('Email đã tồn tại trong hệ thống');
      } else if (error.response?.data?.error === "Password cannot be blank") {
        setRegisterError('Mật khẩu không được để trống');
      } else {
        setRegisterError(
          error.response?.data?.errors?.[0] || 
          error.response?.data?.error || 
          'Đã xảy ra lỗi trong quá trình đăng ký'
        );
      }
      toast.error(registerError);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
        <div className="page-title-section section" data-bg-image="assets/images/bg/page-title-1.webp" style={{ backgroundImage: 'url("assets/images/bg/page-title-1.webp")' }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="page-title">
                <h1 className="title">Login &amp; Register</h1>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active">Login &amp; Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-padding">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="user-login-register">
                <div className="login-register-title">
                  <h2 className="title">Login</h2>
                  <p className="desc">Great to have you back!</p>
                </div>
                <div className="login-register-form">
                  <form onSubmit={handleLoginSubmit}>
                    {loginError && (
                      <div className="alert alert-danger" role="alert">
                        {loginError}
                      </div>
                    )}
                    <div className="row learts-mb-n50">
                      <div className="col-12 learts-mb-50">
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Username or email address"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-50">
                        <input 
                          type="password" 
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                      <div className="col-12 text-center learts-mb-50">
                        <button 
                          type="submit" 
                          className="btn btn-dark btn-outline-hover-dark"
                          disabled={isLoggingIn}
                        >
                          {isLoggingIn ? 'Logging in...' : 'Login'}
                        </button>
                      </div>
                      <div className="col-12 learts-mb-50">
                        <div className="row learts-mb-n20">
                          <div className="col-12 learts-mb-20">
                            <div className="form-check">
                              <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="rememberMe"
                                name="rememberMe"
                                checked={loginData.rememberMe}
                                onChange={handleLoginChange}
                              />
                              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                          </div>
                          <div className="col-12 learts-mb-20">
                            <Link to="/lost-password" className="fw-400">Lost your password?</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="user-login-register bg-light">
                <div className="login-register-title">
                  <h2 className="title">Register</h2>
                  <p className="desc">If you don't have an account, register now!</p>
                </div>
                <div className="login-register-form">
                  <form onSubmit={handleRegisterSubmit}>
                    {registerError && (
                      <div className="alert alert-danger" role="alert">
                        {registerError}
                      </div>
                    )}
                    <div className="row learts-mb-n50">
                      <div className="col-12 learts-mb-20">
                        <label htmlFor="registerEmail">Email address <abbr className="required">*</abbr></label>
                        <input 
                          type="email" 
                          id="registerEmail"
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-20">
                        <label htmlFor="registerFullName">Full Name <abbr className="required">*</abbr></label>
                        <input 
                          type="text" 
                          id="registerFullName"
                          name="fullName"
                          value={registerData.fullName}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-20">
                        <label htmlFor="registerPassword">Password <abbr className="required">*</abbr></label>
                        <input 
                          type="password" 
                          id="registerPassword"
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-20">
                        <label htmlFor="registerRetype">Retype Password <abbr className="required">*</abbr></label>
                        <input 
                          type="password" 
                          id="registerRetype"
                          name="retype"
                          value={registerData.retype}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-50">
                        <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
                      </div>
                      <div className="col-12 text-center learts-mb-50">
                        <button 
                          type="submit" 
                          className="btn btn-dark btn-outline-hover-dark"
                          disabled={isRegistering}
                        >
                          {isRegistering ? 'Registering...' : 'Register'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default LoginRegister;
