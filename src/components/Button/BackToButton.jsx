import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './backToButton.css';

const BackToButton = ({ buttonLocation }) => (
  <Link
    to={buttonLocation}
    title={buttonLocation === '/' ? 'Go back to Home' : 'Go back to details list'}
    className="backButton"
  >
    <button type="button">
      <i className="bx bx-chevron-left" />
    </button>
  </Link>
);

BackToButton.propTypes = {
  buttonLocation: PropTypes.string.isRequired,
};

export default BackToButton;
