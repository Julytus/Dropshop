import React from 'react';

const Topbar: React.FC = () => {
  return (
    <div className="topbar-section section bg-dark">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-auto col-12">
            <p className="text-white text-center text-md-left my-2">Free shipping for orders over $59 !</p>
          </div>
          <div className="col-auto d-none d-md-block">
            <div className="topbar-menu">
              <ul>
                <li><a href="#" className="text-white"><i className="fa fa-map-marker-alt"></i>Store Location</a></li>
                <li><a href="#" className="text-white"><i className="fa fa-truck"></i>Order Status</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar; 