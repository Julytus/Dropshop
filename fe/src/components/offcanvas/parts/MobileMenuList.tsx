import React, { useState } from 'react';

interface MenuItem {
  text: string;
  url?: string;
  children?: MenuItem[];
}

interface MainMenuItem {
  text: string;
  url?: string;
  children?: MenuItem[];
  megaMenu?: {
    groups: {
      title: string;
      items: MenuItem[];
    }[];
  };
}

interface MobileMenuListProps {
  menuItems: MainMenuItem[];
}

const MobileMenuList: React.FC<MobileMenuListProps> = ({ menuItems }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Toggle submenu
  const toggleSubmenu = (key: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Render main menu items
  const renderMenuItem = (item: MainMenuItem, index: number) => {
    const hasChildren = !!(item.children || (item.megaMenu && item.megaMenu.groups.length > 0));
    const isOpen = openMenus[`main-${index}`] || false;
    const menuKey = `main-${index}`;

    return (
      <li key={menuKey} className={hasChildren ? (isOpen ? 'active' : '') : ''}>
        <a href={item.url || '#'}>
          <span className="menu-text">{item.text}</span>
        </a>
        {hasChildren && (
          <span 
            className={`menu-toggle ${isOpen ? 'sub-open' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleSubmenu(menuKey);
            }}
          ></span>
        )}
        {item.megaMenu && isOpen && (
          <ul className="sub-menu" style={{display: isOpen ? 'block' : 'none'}}>
            {item.megaMenu.groups.map((group, groupIndex) => renderMegaMenuGroup(group, `${menuKey}-group-${groupIndex}`))}
          </ul>
        )}
        {item.children && isOpen && (
          <ul className="sub-menu" style={{display: isOpen ? 'block' : 'none'}}>
            {item.children.map((child, childIndex) => renderSubMenuItem(child, `${menuKey}-child-${childIndex}`))}
          </ul>
        )}
      </li>
    );
  };

  // Render mega menu groups
  const renderMegaMenuGroup = (group: { title: string; items: MenuItem[] }, key: string) => {
    const isOpen = openMenus[key] || false;

    return (
      <li key={key} className={isOpen ? 'active' : ''}>
        <a href="#">
          <span className="menu-text">{group.title}</span>
        </a>
        <span 
          className={`menu-toggle ${isOpen ? 'sub-open' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu(key);
          }}
        ></span>
        {isOpen && (
          <ul className="sub-menu" style={{display: isOpen ? 'block' : 'none'}}>
            {group.items.map((item, itemIndex) => renderSubMenuItem(item, `${key}-item-${itemIndex}`))}
          </ul>
        )}
      </li>
    );
  };

  // Render submenu items
  const renderSubMenuItem = (item: MenuItem, key: string) => {
    const hasChildren = !!(item.children && item.children.length > 0);
    const isOpen = openMenus[key] || false;

    return (
      <li key={key} className={hasChildren ? (isOpen ? 'active' : '') : ''}>
        <a href={item.url}>
          <span className="menu-text">{item.text}</span>
        </a>
        {hasChildren && (
          <span 
            className={`menu-toggle ${isOpen ? 'sub-open' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleSubmenu(key);
            }}
          ></span>
        )}
        {hasChildren && isOpen && (
          <ul className="sub-menu" style={{display: isOpen ? 'block' : 'none'}}>
            {item.children!.map((child, childIndex) => renderSubMenuItem(child, `${key}-child-${childIndex}`))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul>
      {menuItems.map((item, index) => renderMenuItem(item, index))}
    </ul>
  );
};

export default MobileMenuList; 