import React from 'react';
import './footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2023 Dota2 Insight Hub</p>
        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/aboutme">About</a></li>
          <li><a href="/references">References</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
