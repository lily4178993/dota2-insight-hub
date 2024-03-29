import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BackToButton from '../Button/BackToButton';
import './nav.css';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  // Define a function to determine the route based on the pathname
  const getRoute = () => {
    const { pathname } = location;
    if (pathname.match(/\/details\/[^/]+\/[^/]+/)) {
      return `/details/${pathname.split('/').slice(2, -1).join('/')}`;
    } if (pathname.match(/\/details\/[^/]+/)) {
      return '/';
    }
    return 'home';
  };

  const activeRoute = getRoute();

  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          {!isNavOpen && activeRoute !== 'home' && (
          <Link to={activeRoute} title="Go back">
            <BackToButton />
          </Link>
          )}
          <div
            className="navbar"
            style={{ background: isNavOpen ? '' : 'var(--color-blue-4)' }}
          >
            <button
              type="button"
              title={isNavOpen ? 'close' : 'menu'}
              className="menu-toggle"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <div className={isNavOpen ? 'hamBox hamBoxOpen' : 'hamBox'}>
                <span className={isNavOpen ? 'lineTop spin' : 'lineTop'}> </span>
                <span className={isNavOpen ? 'lineBottom spin' : 'lineBottom'}>
                  {' '}
                </span>
              </div>
            </button>
            <div className="nav-settings">
              <i className="bx bx-microphone" />
              <i className="bx bx-cog" />
            </div>
          </div>
          <div
            className="nav-overlay"
            style={{
              top: isNavOpen ? '0' : '-100%',
              transitionDelay: isNavOpen ? '0s' : '0s',
            }}
          >
            <ul className="nav-links">
              <li className="nav-item">
                <Link
                  to="/"
                  rel="noopener noreferrer"
                  aria-label="Home"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '120px',
                    transitionDelay: isNavOpen ? '0.8s' : '0s',
                  }}
                >
                  Home
                </Link>
                <div className="nav-item-wrapper"> </div>
              </li>
              <li className="nav-item">
                <Link
                  to="/details/heroes"
                  rel="noopener noreferrer"
                  aria-label="Heroes"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '120px',
                    transitionDelay: isNavOpen ? '0.9s' : '0s',
                  }}
                >
                  Heroes
                </Link>
                <div className="nav-item-wrapper"> </div>
              </li>
              <li className="nav-item">
                <Link
                  to="/details/items"
                  rel="noopener noreferrer"
                  aria-label="Home"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '120px',
                    transitionDelay: isNavOpen ? '1s' : '0s',
                  }}
                >
                  Items
                </Link>
                <div className="nav-item-wrapper"> </div>
              </li>
              <li className="nav-item">
                <Link
                  to="/details/proMatches"
                  rel="noopener noreferrer"
                  aria-label="Pro Matches"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '120px',
                    transitionDelay: isNavOpen ? '1.1s' : '0s',
                  }}
                >
                  Pro Matches
                </Link>
                <div className="nav-item-wrapper"> </div>
              </li>
              <li className="nav-item">
                <Link
                  to="/details/proPlayers"
                  rel="noopener noreferrer"
                  aria-label="Pro Players"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '120px',
                    transitionDelay: isNavOpen ? '1.2s' : '0s',
                  }}
                >
                  Pro Players
                </Link>
                <div className="nav-item-wrapper"> </div>
              </li>
            </ul>
            <div className="nav-footer">
              <div className="dev-infos">
                <Link
                  to="/aboutme"
                  rel="noopener noreferrer"
                  aria-label="About Me"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '-20px',
                    opacity: isNavOpen ? '1' : '0',
                    transitionDelay: isNavOpen ? '1.2s' : '0s',
                  }}
                >
                  About Me
                </Link>
                <Link
                  to="/references"
                  rel="noopener noreferrer"
                  aria-label="References"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  style={{
                    top: isNavOpen ? '0' : '-20px',
                    opacity: isNavOpen ? '1' : '0',
                    transitionDelay: isNavOpen ? '1.3s' : '0s',
                  }}
                >
                  References
                </Link>
              </div>
              <div className="nav-social-media">
                <ul>
                  <li>
                    <a
                      href="https://github.com/lily4178993/dota2-insight-hub.git"
                      rel="noreferrer"
                      target="_blank"
                      aria-label="GitHub page"
                      onClick={() => setIsNavOpen(!isNavOpen)}
                      style={{
                        top: isNavOpen ? '0' : '-20px',
                        opacity: isNavOpen ? '1' : '0',
                        transitionDelay: isNavOpen ? '1.4s' : '0s',
                      }}
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="#LinkedIn"
                      rel="noreferrer"
                      aria-label="LinkedIn page"
                      onClick={() => setIsNavOpen(!isNavOpen)}
                      style={{
                        top: isNavOpen ? '0' : '-20px',
                        opacity: isNavOpen ? '1' : '0',
                        transitionDelay: isNavOpen ? '1.5s' : '0s',
                      }}
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
