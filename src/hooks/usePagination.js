import { useState } from 'react';

export default function usePagination(initialItems, itemsPerPage) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = initialItems.slice(itemOffset, endOffset);

  const handlePageChange = (newOffset) => {
    setItemOffset(newOffset);
  };

  return { currentItems, handlePageChange, itemOffset };
}
