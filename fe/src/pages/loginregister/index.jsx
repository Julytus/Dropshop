import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
  // State cho form đăng nhập
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // State cho form đăng ký
  const [registerData, setRegisterData] = useState({
    email: ''
  });

  // Handlers cho form đăng nhập
  const handleLoginChange = (e) => {
    const { name, value, checked, type } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handlers cho form đăng ký
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  // Submit handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    // Thêm logic đăng nhập ở đây
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', registerData);
    // Thêm logic đăng ký ở đây
  };

  return (
    <>
      <div 
        className="page-title-section section" 
        style={{ backgroundImage: "url('/assets/images/bg/page-title-1.webp')" }}
      >
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
                    <div className="row learts-mb-n50">
                      <div className="col-12 learts-mb-50">
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Username or email address"
                          value={loginData.email}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <div className="col-12 learts-mb-50">
                        <input 
                          type="password" 
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                        />
                      </div>
                      <div className="col-12 text-center learts-mb-50">
                        <button type="submit" className="btn btn-dark btn-outline-hover-dark">Login</button>
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
                        <label htmlFor="registerEmail"> Full Name <abbr className="required">*</abbr></label>
                        <input 
                          type="email" 
                          id="registerEmail"
                          name="fullName"
                          value={registerData.fullName}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-20">
                        <label htmlFor="registerEmail">Password <abbr className="required">*</abbr></label>
                        <input 
                          type="password" 
                          id="password"
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="col-12 learts-mb-20">
                        <label htmlFor="registerEmail">Retype Password <abbr className="required">*</abbr></label>
                        <input 
                          type="password" 
                          id="retype"
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
                        <button type="submit" className="btn btn-dark btn-outline-hover-dark">Register</button>
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
