import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyAccountSidebar from './components/MyAccountSidebar';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Address from './components/Address';
import AccountDetails from './components/AccountDetails';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className={`tab-pane fade ${activeTab === 'dashboard' ? 'show active' : ''}`}><Dashboard /></div>;
      case 'orders':
        return <div className={`tab-pane fade ${activeTab === 'orders' ? 'show active' : ''}`}><Orders /></div>;
      case 'address':
        return <div className={`tab-pane fade ${activeTab === 'address' ? 'show active' : ''}`}><Address /></div>;
      case 'account-info':
        return <div className={`tab-pane fade ${activeTab === 'account-info' ? 'show active' : ''}`}><AccountDetails /></div>;
      default:
        return <div className="tab-pane fade show active"><Dashboard /></div>;
    }
  };

  return (
    <>
      {/* Page Title/Header Start */}
      <div className="page-title-section section" style={{ backgroundImage: 'url("assets/images/bg/page-title-1.webp")' }}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="page-title">
                <h1 className="title">My Account</h1>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active">My Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Title/Header End */}

      {/* My Account Section Start */}
      <div className="section section-padding">
        <div className="container">
          <div className="row learts-mb-n30">
            {/* My Account Tab List Start */}
            <div className="col-lg-4 col-12 learts-mb-30">
              <MyAccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            {/* My Account Tab List End */}

            {/* My Account Tab Content Start */}
            <div className="col-lg-8 col-12 learts-mb-30">
              <div className="tab-content">
                {renderTabContent()}
              </div>
            </div>
            {/* My Account Tab Content End */}
          </div>
        </div>
      </div>
      {/* My Account Section End */}
    </>
  );
};

export default MyAccount;
