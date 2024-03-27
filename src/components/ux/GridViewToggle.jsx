import React from 'react';
import PropTypes from 'prop-types';
import { IconGrid, IconList } from '../../assets';

/*
  Component to toggle between Grid and List view
*/
function GridViewToggle({ listViewOption, handleViewOptionChange }) {
  return (
    <div className="m-2 w-fit">
      <button
        type="button"
        title="Grid View"
        aria-label="Grid View"
        onClick={() => handleViewOptionChange(false)}
        className={`hover:opacity-50 focus-visible:opacity-50 mr-2 rounded-md ${
          !listViewOption ? 'drop-shadow-lg bg-blue-500' : ''
        }`}
      >
        <img
          src={IconGrid}
          alt="GRID"
          className="w-10 h-10 p-1 object-cover"
        />
      </button>
      <button
        type="button"
        title="List View"
        aria-label="List View"
        onClick={() => handleViewOptionChange(true)}
        className={`hover:opacity-50 focus-visible:opacity-50 mr-2 rounded-md ${
          listViewOption ? 'drop-shadow-lg bg-blue-500' : ''
        }`}
      >
        <img
          src={IconList}
          alt="LIST"
          className="w-10 h-10 p-1 object-cover"
        />
      </button>
    </div>
  );
}

GridViewToggle.propTypes = {
  listViewOption: PropTypes.bool.isRequired,
  handleViewOptionChange: PropTypes.func.isRequired,
};

export default GridViewToggle;
