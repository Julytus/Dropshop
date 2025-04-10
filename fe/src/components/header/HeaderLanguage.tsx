import React from 'react';

const HeaderLanguage: React.FC = () => {
  return (
    <div className="col">
      <ul className="header-lan-curr">
        <li>
          <a href="#">English</a>
          <ul className="curr-lan-sub-menu">
            <li><a href="#">Français</a></li>
            <li><a href="#">Deutsch</a></li>
          </ul>
        </li>
        <li>
          <a href="#">USD</a>
          <ul className="curr-lan-sub-menu">
            <li><a href="#">EUR</a></li>
            <li><a href="#">GBP</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default HeaderLanguage; 