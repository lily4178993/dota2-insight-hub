import { useMemo } from 'react';

const useFilteredData = (data, checkboxFilters, searchQuery) => {
  const options = useMemo(() => ({
    checkboxFilters,
    searchQuery,
  }), [checkboxFilters, searchQuery]);

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    let result = [...data]; // Start with all data

    // Apply checkbox filters
    if (options.checkboxFilters) {
      Object.keys(options.checkboxFilters).forEach((key) => {
        const values = options.checkboxFilters[key];
        if (values.length > 0) {
          result = result.filter((item) => values.includes(item[key]));
        }
      });
    }

    // Apply search query filter
    if (options.searchQuery) {
      const searchQueryLower = options.searchQuery.toLowerCase();
      result = result.filter((item) => Object
        .values(item).some((val) => String(val).toLowerCase().includes(searchQueryLower)));
    }

    return result;
  }, [data, options]);

  return filteredData;
};

export default useFilteredData;
