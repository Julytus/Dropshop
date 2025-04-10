import React from 'react';
import MobileHeaderLogo from './MobileHeaderLogo';
import MobileHeaderTools from './MobileHeaderTools';

interface MobileHeaderProps {
  isSticky?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ isSticky = false }) => {
  const headerClass = isSticky 
    ? "mobile-header sticky-header bg-white section d-xl-none" 
    : "mobile-header bg-white section d-xl-none";

  return (
    <div className={headerClass}>
      <div className="container">
        <div className="row align-items-center">

          {/* Header Logo Start */}
          <MobileHeaderLogo />
          {/* Header Logo End */}

          {/* Header Tools Start */}
          <MobileHeaderTools />
          {/* Header Tools End */}

        </div>
      </div>
    </div>
  );
};

export default MobileHeader; 