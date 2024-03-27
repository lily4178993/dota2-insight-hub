import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

function Card({
  cardImage, cardTitle, cardCount,
}) {
  return (
    <div className="card-container">
      <button type="button" aria-label="More details" title="More details">
        <i className="bx bx-right-arrow-circle" />
      </button>
      <div className="card-image">
        <img src={cardImage} alt={typeof cardTitle === 'function' ? 'N/A' : cardTitle} />
      </div>
      <div className="card-content">
        <h2>{typeof cardTitle === 'function' ? 'N/A' : cardTitle}</h2>
        <span>{cardCount}</span>
      </div>
    </div>
  );
}

Card.defaultProps = {
  cardImage: '',
  cardTitle: '',
};

Card.propTypes = {
  cardCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  cardImage: PropTypes.string,
  cardTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default Card;
