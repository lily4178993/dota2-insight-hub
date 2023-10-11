import React from 'react';
import Nav from '../Menu/Nav';
import './header.css';

const Header = () => (
  <header className="header">
    <Nav />
    <div className="header-content">
      <div className="header-image-blurred-edge">{' '}</div>
      <div className="header-description">
        <span className="header-reference">{' '}</span>
      </div>
    </div>
  </header>
);

export default Header;
