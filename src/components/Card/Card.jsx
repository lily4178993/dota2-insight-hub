import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({
  cardImage, cardTitle, cardCount, isParser,
}) => {
  const generatePosterlink = (imgUrl) => {
    const nameParam = imgUrl.split('/').pop().replace('.png?', '');
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${nameParam}.png`;
  };

  return (
    <div className="card-container">
      <button type="button" title="More details">
        <i className="bx bx-right-arrow-circle" />
      </button>
      <div className="card-image">
        {isParser ? (
          <img src={generatePosterlink(cardImage)} alt={cardTitle} />
        ) : (
          <img src={cardImage} alt={cardTitle} />
        )}
      </div>
      <div className="card-content">
        <h2>{cardTitle}</h2>
        <span>{cardCount}</span>
      </div>
    </div>
  );
};

Card.defaultProps = {
  isParser: false,
  cardImage: PropTypes.string,
  cardTitle: PropTypes.string,
};

Card.propTypes = {
  cardCount: PropTypes.number.isRequired,
  cardImage: PropTypes.string,
  cardTitle: PropTypes.string,
  isParser: PropTypes.bool,
};

export default Card;
