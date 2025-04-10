import React from 'react';
import { MainMenuItem, MenuGroup, MenuItem } from '../../data/menuData';

interface MenuRendererProps {
  menuItems: MainMenuItem[];
  className?: string;
}

export const MenuRenderer: React.FC<MenuRendererProps> = ({ menuItems, className = 'site-main-menu justify-content-center' }) => {
  // Render menu item với submenu
  const renderMenuItem = (item: MainMenuItem) => {
    return (
      <li className="has-children" key={item.text}>
        <a href={item.url || '#'}><span className="menu-text">{item.text}</span></a>
        {item.megaMenu && renderMegaMenu(item.megaMenu.groups, item.megaMenu.banner)}
        {item.children && renderSubMenu(item.children)}
      </li>
    );
  };

  // Render mega menu
  const renderMegaMenu = (groups: MenuGroup[], banner?: { url: string; image: string; alt: string }) => {
    return (
      <ul className="sub-menu mega-menu">
        {groups.map((group, index) => (
          <li key={index}>
            <a href="#" className="mega-menu-title"><span className="menu-text">{group.title}</span></a>
            <ul>
              {group.items.map((item, idx) => renderMegaMenuItem(item, idx))}
            </ul>
          </li>
        ))}
        {banner && (
          <li className="align-self-center">
            <a href={banner.url} className="menu-banner">
              <img src={banner.image} alt={banner.alt} />
            </a>
          </li>
        )}
      </ul>
    );
  };

  // Render mega menu item
  const renderMegaMenuItem = (item: MenuItem, index: number) => {
    return (
      <li key={index}>
        {item.image && <img className="mmh_img" src={item.image} alt={`menu-${index}`} />}
        <a href={item.url}>
          <span className="menu-text">{item.text}</span>
        </a>
      </li>
    );
  };

  // Render standard submenu
  const renderSubMenu = (items: MenuItem[]) => {
    return (
      <ul className="sub-menu">
        {items.map((item, index) => (
          <li key={index} className={item.children ? 'has-children' : ''}>
            <a href={item.url}><span className="menu-text">{item.text}</span></a>
            {item.children && renderSubMenu(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={className}>
      <ul>
        {menuItems.map(item => renderMenuItem(item))}
      </ul>
    </nav>
  );
};

export default MenuRenderer; 