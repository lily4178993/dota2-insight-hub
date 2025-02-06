import React from 'react';
import { useSelector } from 'react-redux';
import { selectItemsState } from '../../redux/slices';
import { categorizeItem } from '../../utils';
import { useCategoryPagination } from '../../hooks';
import { Pagination } from '../../components';

function ItemsPage() {
  const { items } = useSelector(selectItemsState);
  const itemsPerPage = 12;

  // Categorize items
  const categorizedItems = items.map((item) => ({
    item,
    categories: categorizeItem(item),
  }));

  // Group items by category
  const itemsByCategory = {};
  categorizedItems.forEach(({ item, categories }) => {
    categories.forEach((category) => {
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = [];
      }
      itemsByCategory[category].push(item);
    });
  });

  // eslint-disable-next-line max-len
  const { paginatedItemsByCategory, handlePageChange, paginationState } = useCategoryPagination(itemsByCategory, itemsPerPage);

  return (
    <>
      <h1>Categorized Items</h1>
      <div>
        {Object.entries(paginatedItemsByCategory).map(
          ([category, paginatedItems]) => (
            <div key={category}>
              <h2 className="w-full text-2xl bg-white text-slate-900">
                {category}
              </h2>
              <ul>
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <li key={item.id}>
                      <span>{item.dname}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-3xl flex items-center justify-center w-full h-96 border-[1px] border-slate-400 rounded-md">
                    There are no items in this category.
                  </p>
                )}
              </ul>
              <Pagination
                itemsPerPage={itemsPerPage}
                itemCount={itemsByCategory[category].length}
                onPageChange={(newOffset) => handlePageChange(category, newOffset)}
                itemOffset={paginationState[category] || 0}
              />
            </div>
          ),
        )}
      </div>
    </>
  );
}

export default ItemsPage;
