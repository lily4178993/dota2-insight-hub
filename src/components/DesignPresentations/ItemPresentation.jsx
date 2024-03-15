import React from 'react';
import PropTypes from 'prop-types';
import './itemPresentation.css';

function ItemPresentation({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="error-fetch">
        Something went wrong!
        <br />
        Item&apos;s data not found
      </div>
    );
  }
  return (
    <div className="item-presentation">
      <div className="item-details">
        <h2>Overview</h2>
        <p>
          <strong>Name:</strong>
          {' '}
          {data.dname}
        </p>
        <p>
          <strong>Type:</strong>
          {' '}
          {data?.qual}
        </p>
        <p>
          <strong>Mana Cost:</strong>
          {' '}
          {data?.mc ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Cost:</strong>
          {' '}
          {data?.cost}
          {' '}
          Gold
        </p>
        <p>
          <strong>Cooldown:</strong>
          {' '}
          {data?.cd ? `${data?.cd} seconds` : 'N/A'}
        </p>
        <div className="item-image">
          <strong>Item Image:</strong>
          <br />
          <img src={`https://api.opendota.com${data?.img}`} alt={data?.dname} />
        </div>
        <p>
          <strong>Lore:</strong>
          {' "'}
          {data?.lore}
          {'" '}
        </p>
        <p>
          <strong>Usage:</strong>
          {' '}
          {data?.hint[0]}
        </p>
        <h3>Special Notes:</h3>
        <p>{data?.notes}</p>
      </div>
    </div>
  );
}
ItemPresentation.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    dname: PropTypes.string.isRequired,
    qual: PropTypes.string.isRequired,
    lore: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    mc: PropTypes.bool.isRequired,
    cd: PropTypes.number,
    hint: PropTypes.arrayOf(PropTypes.string).isRequired,
    length: PropTypes.number,
  }).isRequired,
};

export default ItemPresentation;
