import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2023 Dota2 Insight Hub</p>
        <ul className="footer-links">
          <li>
            <Link
              to="/"
              rel="noopener noreferrer"
              aria-label="Home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/aboutme"
              rel="noopener noreferrer"
              aria-label="About Me"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/references"
              rel="noopener noreferrer"
              aria-label="References"
            >
              References
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/lily4178993/dota2-insight-hub.git"
              rel="noreferrer"
              target="_blank"
              aria-label="GitHub page"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
