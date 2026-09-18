import { useState } from 'react';

const useFilter = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return {
    filters,
    updateFilters,
  };
};

export default useFilter;
