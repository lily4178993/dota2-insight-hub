import React from 'react';
import { useSelector } from 'react-redux';
import { selectItemsState } from '../../redux/slices';
import { categorizeItem /* , generateItemIconlink */ } from '../../utils';
import { useCategoryPagination } from '../../hooks';
import { ItemsCard, Pagination } from '../../components';

function ItemsPage() {
  const { items } = useSelector(selectItemsState);
  const itemsPerPage = 8;

  // Categorize items
  const categorizedItems = items.map((item) => ({
    item,
    categories: categorizeItem(item),
  }));

  const itemsByCategory = {}; // Store items by category
  const categoryDescriptions = {}; // Store descriptions for each category
  categorizedItems.forEach(({ item, categories }) => {
    categories.forEach(({ category, description }) => {
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = [];
        categoryDescriptions[category] = description;
      }
      itemsByCategory[category].push(item);
    });
  });

  // eslint-disable-next-line max-len
  const { paginatedItemsByCategory, handlePageChange, paginationState } = useCategoryPagination(itemsByCategory, itemsPerPage);

  return (
    <>
      {Object.entries(paginatedItemsByCategory).map(
        ([category, paginatedItems]) => (
          <section
            key={category}
            // className="grid gap-4 p-4 smx:grid-cols-2 md:grid-cols-4"
            className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4"
          >
            <h2 className="text-4xl font-extrabold smx:col-span-2 smx:grid smx:gap-4 smx:grid-cols-2 md:col-span-3 md:text-5xl md:grid-cols-3">
              <span className="md:col-span-2">{category}</span>
            </h2>
            <p className="smx:row-start-2 smx:col-start-2 smx:self-center md:col-start-1 md:col-span-2 md:pr-12 md:text-lg">
              {categoryDescriptions[category] || 'No description available.'}
            </p>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, position) => (
                <div
                  key={item.id}
                  className={` relative group md:justify-self-end smx:size-full md:h-fit bg-orange-950 ${
                    position === 2 || position === 4 || position === 7
                      ? 'bg-yellow-800'
                      : 'bg-orange-950'
                  } ${position === 3 ? 'md:col-start-2' : ''}`}
                >
                  <ItemsCard item={item} />
                  {/* <span className="block px-4 mt-3 md:text-lg z-[2]">
                    {item.dname}
                  </span>
                  <div className="absolute top-0 right-0 w-1/2 bg-pink-600 md:size-full">
                    <img
                      src={generateItemIconlink(item.img)}
                      alt={item.dname}
                      className="size-full md:aspect-square group-hover:scale-110"
                    />
                  </div> */}
                </div>
              ))
            ) : (
              <p className="text-3xl flex items-center justify-center w-full h-96 border-[1px] border-slate-400 rounded-md md:md:text-lg">
                There are no items in this category.
              </p>
            )}

            <div className="self-center md:col-span-2 md:text-center md:px-4">
              <Pagination
                itemsPerPage={itemsPerPage}
                itemCount={itemsByCategory[category].length}
                onPageChange={(newOffset) => handlePageChange(category, newOffset)}
                itemOffset={paginationState[category] || 0}
              />
            </div>
          </section>
        ),
      )}
    </>
  );
}

export default ItemsPage;
