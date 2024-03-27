import React from 'react';
import Nav from '../Menu/Nav';
import './header.css';

function Header() {
  return (
    <header className="header">
      <Nav />
      <div className="header-content">
        <div className="header-image-blurred-edge">{' gggg'}</div>
        <div className="header-description">
          <span className="header-reference">{' fffff'}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
