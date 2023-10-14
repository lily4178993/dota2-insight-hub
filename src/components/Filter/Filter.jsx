import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './filter.css';

const Filter = ({ setFilter }) => {
  const [isBoxFilterOpen, setIsBoxFilterOpen] = useState(true);

  return (
    <div className="header-filter-box">
      <span>Choose a Card</span>
      <button type="button" title="Filter" onClick={() => setIsBoxFilterOpen(!isBoxFilterOpen)}>
        {isBoxFilterOpen ? 'Filter' : 'Filter By'}
        {' '}
        <i
          className="bx bx-down-arrow-circle"
          style={{ transform: isBoxFilterOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
        />
      </button>
      <div
        className="filter-box"
        style={{
          right: isBoxFilterOpen ? '-100%' : '1em',
        }}
      >
        <ul>
          <li>
            <button
              type="button"
              title="Filter by Names"
              onClick={() => { setFilter('Names'); setIsBoxFilterOpen(!isBoxFilterOpen); }}
            >
              Names
            </button>
          </li>
          <li>
            <button
              type="button"
              title="Filter by Counts"
              onClick={() => { setFilter('Counts'); setIsBoxFilterOpen(!isBoxFilterOpen); }}
            >
              Counts
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func,
};

Filter.defaultProps = {
  setFilter: PropTypes.func,
};

export default Filter;
