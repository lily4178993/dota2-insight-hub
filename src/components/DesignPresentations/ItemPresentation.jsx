import React from 'react';
import PropTypes from 'prop-types';
import './itemPresentation.css';

const ItemPresentation = ({ data }) => (
  <div className="item-presentation">
    <div className="item-image">
      <img src={data.img} alt={data.dname} />
    </div>
    <div className="item-details">
      <h2>{data.dname}</h2>
      <p>
        <strong>Usage:</strong>
        {' '}
        {data.hint[0]}
      </p>
      <p>
        <strong>Cost:</strong>
        {' '}
        {data.cost}
        {' '}
        Gold
      </p>
      <p>
        <strong>Special Notes:</strong>
        {' '}
        {data.notes}
      </p>
      <p>
        <strong>Mana Cost:</strong>
        {' '}
        {data.mc ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Cooldown:</strong>
        {' '}
        {data.cd ? `${data.cd} seconds` : 'N/A'}
      </p>
      <p>
        <strong>Lore:</strong>
        {' '}
        {data.lore}
      </p>
    </div>
  </div>
);

ItemPresentation.propTypes = {
  data: PropTypes.shape({
    img: PropTypes.string.isRequired,
    dname: PropTypes.string.isRequired,
    lore: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    mc: PropTypes.bool.isRequired,
    cd: PropTypes.number,
    hint: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ItemPresentation;
