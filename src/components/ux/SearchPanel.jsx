import React, { useState } from 'react';
import { IconClose, IconSearch } from '../../assets';

// eslint-disable-next-line react/prop-types
function SearchPanel({ onSearch }) {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchExpansion = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <label
      htmlFor="search"
      className="flex gap-1"
    >
      <button
        type="button"
        title={expanded ? 'close' : 'Search'}
        aria-label={expanded ? 'close' : 'Search'}
        onClick={handleSearchExpansion}
        className="hover:opacity-50 focus-visible:opacity-50 rounded-md drop-shadow-lg bg-blue-500"
      >
        {expanded ? (
          <img
            src={IconClose}
            alt="Close"
            className="w-10 h-10 p-1 object-cover"
          />
        ) : (
          <img
            src={IconSearch}
            alt="Search"
            className="w-10 h-10 p-1 object-cover"
          />
        )}
      </button>
      <input
        type="search"
        name="search"
        id="search"
        size="10"
        maxLength={100}
        placeholder="Search..."
        className={`bg-transparent outline-none ring-none border-transparent ${
          expanded
            ? 'w-28 sm:w-32 md:w-56 lg:w-64 py-1 px-2 border-b-2 border-b-white rounded-md drop-shadow-lg transition-all'
            : 'w-0'
        }`}
        value={searchQuery}
        onChange={handleInputChange}
      />
    </label>
  );
}

export default SearchPanel;
