import React from 'react';
/* import { Link } from 'react-router-dom'; */
import Nav from '../Menu/Nav';
import './header.css';

const Header = () => (
  <header>
    <Nav />
    <div className="header-content">
      f
      {/* The header-content image and text will change depending of the url/page-location. */}
    </div>
    {/* Filter change depending of the url/page-location. Same for the title.
      For the detail page of heroes for example, this header-filter-box
      will not have any title nor filter */}
    <div className="header-filter-box">
      <span>All categories</span>
      <button type="button" title="Filter">
        Filter
        {' '}
        <i className="bx bx-down-arrow-circle" />
      </button>
    </div>
  </header>
);

export default Header;
