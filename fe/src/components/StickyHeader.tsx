import React from 'react';
import StickyHeaderLogo from './sticky/StickyHeaderLogo';
import StickyHeaderMenu from './menu/MenuRenderer';
import StickyHeaderTools from './sticky/StickyHeaderTools';
import { menuData } from '../data/menuData';
const StickyHeader: React.FC = () => {
  return (
    <div className="sticky-header header-menu-center section bg-white d-none d-xl-block">
      <div className="container">
        <div className="row align-items-center">

          {/* Header Logo Start */}
          <StickyHeaderLogo />
          {/* Header Logo End */}

          {/* Search Start */}
          <StickyHeaderMenu menuItems={menuData} />
          {/* Search End */}

          {/* Header Tools Start */}
          <StickyHeaderTools />
          {/* Header Tools End */}

        </div>
      </div>
    </div>
  );
};

export default StickyHeader; 