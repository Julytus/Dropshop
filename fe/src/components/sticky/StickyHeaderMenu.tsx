import React from 'react';
import { menuData } from '../../data/menuData';
import MenuRenderer from '../menu/MenuRenderer';

const StickyHeaderMenu: React.FC = () => {
  return (
    <div className="col d-none d-xl-block">
      <MenuRenderer menuItems={menuData} />
    </div>
  );
};

export default StickyHeaderMenu; 