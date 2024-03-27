import { useMemo } from 'react';

const useFilteredData = (data, checkboxFilters, searchQuery) => {
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.filter((hero) => {
      // Search filter
      const matchesSearch = searchQuery.length === 0 || Object.values(hero).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      // Checkbox filters
      const matchesFilters = checkboxFilters.every((filter) => {
        if (!filter.checked) return true; // Skip unchecked filters

        switch (filter.type) {
          case 'primary_attr':
            return hero.primary_attr === filter.value;
          case 'role':
            return hero.roles.includes(filter.label);
          // Implement other cases as necessary
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, checkboxFilters, searchQuery]);

  return filteredData;
};

export default useFilteredData;
