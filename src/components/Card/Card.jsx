import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({
  cardImage, cardTitle, cardCount, index,
}) => {
  const cardClass = index % 2 === 0 ? 'even' : 'odd';

  return (
    <div className={`card-container ${cardClass}`}>
      <button type="button" title="More details">
        {' '}
        <i className="bx bx-right-arrow-circle" />
      </button>
      <div className="card-image"><img src={cardImage} alt={cardTitle} /></div>
      <div className="card-content">
        <h2>{cardTitle}</h2>
        <span>{cardCount}</span>
      </div>
    </div>
  );
};
Card.propTypes = {
  cardCount: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
