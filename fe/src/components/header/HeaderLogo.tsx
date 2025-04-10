import React from 'react';

const HeaderLogo: React.FC = () => {
  return (
    <div className="col">
      <div className="header-logo justify-content-center">
        <a href="/">
          <img src="assets/images/logo/logo.webp" alt="Learts Logo" />
        </a>
      </div>
    </div>
  );
};

export default HeaderLogo; 