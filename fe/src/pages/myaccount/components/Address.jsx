import React from 'react';

const Address = () => {
  return (
    <div className="tab-pane fade show active">
      <div className="myaccount-content address">
        <p>The following addresses will be used on the checkout page by default.</p>
        <div className="row learts-mb-n30">
          <div className="col-md-6 col-12 learts-mb-30">
            <h4 className="title">Billing Address <a href="#" className="edit-link">edit</a></h4>
            <address>
              <p><strong>Alex Tuntuni</strong></p>
              <p>1355 Market St, Suite 900 <br />
                San Francisco, CA 94103</p>
              <p>Mobile: (123) 456-7890</p>
            </address>
          </div>
          <div className="col-md-6 col-12 learts-mb-30">
            <h4 className="title">Shipping Address <a href="#" className="edit-link">edit</a></h4>
            <address>
              <p><strong>Alex Tuntuni</strong></p>
              <p>1355 Market St, Suite 900 <br />
                San Francisco, CA 94103</p>
              <p>Mobile: (123) 456-7890</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address; 