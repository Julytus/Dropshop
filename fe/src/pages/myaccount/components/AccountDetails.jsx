import React from 'react';
import { useSelector } from 'react-redux';

const AccountDetails = () => {
  const user = useSelector(state => state.account.userProfile);
  const fullName = user?.full_name || '';
  const email = user?.email || '';

  return (
    <div className="tab-pane fade show active">
      <div className="myaccount-content account-details">
        <div className="account-details-form">
          <form action="#">
            <div className="row learts-mb-n30">
              <div className="col-12 learts-mb-30">
                <label htmlFor="display-name">Display Name <abbr className="required">*</abbr></label>
                <input type="text" id="display-name" defaultValue={fullName} />
                <p>This will be how your name will be displayed in the account section and in reviews</p>
              </div>
              <div className="col-12 learts-mb-30">
                <label htmlFor="email">Email Address <abbr className="required">*</abbr></label>
                <input type="email" id="email" defaultValue={email} disabled />
              </div>
              <div className="col-12 learts-mb-30 learts-mt-30">
                <fieldset>
                  <legend>Password change</legend>
                  <div className="row learts-mb-n30">
                    <div className="col-12 learts-mb-30">
                      <label htmlFor="current-pwd">Current password (leave blank to leave unchanged)</label>
                      <input type="password" id="current-pwd" />
                    </div>
                    <div className="col-12 learts-mb-30">
                      <label htmlFor="new-pwd">New password (leave blank to leave unchanged)</label>
                      <input type="password" id="new-pwd" />
                    </div>
                    <div className="col-12 learts-mb-30">
                      <label htmlFor="confirm-pwd">Confirm new password</label>
                      <input type="password" id="confirm-pwd" />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="col-12 learts-mb-30">
                <button className="btn btn-dark btn-outline-hover-dark">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails; 