import { useState } from 'react';

function useCategoryPagination(itemsByCategory, itemsPerPage) {
  const [paginationState, setPaginationState] = useState(
    Object.fromEntries(Object.keys(itemsByCategory).map((key) => [key, 0])),
  );

  const handlePageChange = (category, newOffset) => {
    setPaginationState((prev) => ({
      ...prev,
      [category]: newOffset,
    }));
  };

  // Compute paginated items for each category
  const paginatedItemsByCategory = Object.fromEntries(
    Object.entries(itemsByCategory).map(([category, categoryItems]) => {
      const itemOffset = paginationState[category] || 0;
      const endOffset = itemOffset + itemsPerPage;
      return [category, categoryItems.slice(itemOffset, endOffset)];
    }),
  );

  return { paginatedItemsByCategory, handlePageChange, paginationState };
}

export default useCategoryPagination;
