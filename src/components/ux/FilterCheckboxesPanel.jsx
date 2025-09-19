import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconFilter } from '../../assets';

function FilterCheckboxesPanel({ options, onFilterChange }) {
  const [expanded, setExpanded] = useState(false);

  const handleFilterExpansion = () => {
    setExpanded(!expanded);
  };

  const handleCheckboxChange = (option) => {
    const updatedOptions = options.map((item) => {
      if (item.id === option.id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    onFilterChange(updatedOptions);
  };

  return (
    <>
      <button
        type="button"
        title={expanded ? 'Close' : 'Filter'}
        aria-label={expanded ? 'Close' : 'Filter'}
        onClick={handleFilterExpansion}
        className="hover:opacity-50 focus-visible:opacity-50 rounded-md drop-shadow-lg bg-blue-500"
      >
        <img
          src={IconFilter}
          alt="FILTER"
          className="w-10 h-10 p-1 object-cover"
        />
      </button>
      {expanded && (
        <div className="absolute right-2 top-20 z-10 mt-2 p-2 rounded-md shadow-lg backdrop-blur-sm bg-gradient-to-r from-black/70 to-orange-950/70 hover:from-orange-950/70 hover:to-blue-950/70 max-h-60 w-48 md:w-full md:max-w-96 md:flex md:flex-wrap md:justify-between md:gap-3 overflow-auto">
          <span className="text-xl mb-4 block w-full font-semibold">Filter By: </span>
            {options.map((option) => (
              <div key={option.id} className="filter-option mb-2">
                <label htmlFor={`filter-${option.id}`} className="p-1 flex items-center gap-2 cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
                  <input
                    type="checkbox"
                    id={`filter-${option.id}`}
                    checked={option.checked}
                    value={option.value}
                    onChange={() => handleCheckboxChange(option)}
                    className="form-checkbox rounded checked:border-indigo-500"
                  />
                  {option.label}
                </label>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

FilterCheckboxesPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  })).isRequired,
};

export default FilterCheckboxesPanel;
