/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './backToButton.css';

const BackToButton = () => (
  <div className="backButton">
    <button type="button" title="Go back">
      <i className="bx bx-chevron-left" />
    </button>
  </div>
);

export default BackToButton;
