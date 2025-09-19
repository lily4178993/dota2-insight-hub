import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllItemsState } from '../../redux/slices';
import { categorizeItem, generateItemIconlink } from '../../utils';
import { useCategoryPagination } from '../../hooks';

function ItemsPage() {
  const { items } = useSelector(selectAllItemsState);
  const itemsPerPage = 5;

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

  // eslint-disable-next-line max-len, operator-linebreak
  const { paginatedItemsByCategory } = useCategoryPagination(
    itemsByCategory,
    itemsPerPage
  );

  return (
    <>
      {Object.entries(paginatedItemsByCategory).map(
        ([category, paginatedItems]) => (
          <section
            key={category}
            className="relative w-screen h-screen overflow-hidden carrousel bg-gradient-to-r from-black to-slate-900"
          >
            {/* List of items */}
            <div className="list">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <div
                    className="absolute inset-0 item first:z-[1]"
                    key={item.id}
                  >
                    <img
                      src={generateItemIconlink(item.img)}
                      alt={item.dname}
                      className="object-cover size-full"
                    />
                    <div className="content w-[1140px] absolute top-[20%] left-1/2 -translate-x-1/2 max-w-[80%] pr-[30%]">
                      <span className="title">{item.dname}</span>
                      <p className="description">{item.lore || item.notes}</p>
                      <div className="grid grid-cols-2 gap-1 mt-5 buttons w-[50%] place-items-start">
                        <button type="button">SEE MORE</button>
                        <button type="button">THINK ABOUT</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-3xl flex items-center justify-center w-full h-96 border-[1px] border-slate-400 rounded-md md:md:text-lg">
                  There are no items to generate background in this category.
                </p>
              )}
            </div>
            {/* List of thumbnails */}
            <div className="thumbnails absolute z-10 left-1/2 bottom-[50px] flex gap-5 max-w-max">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <div
                    className="flex-shrink-0 item w-[150px] h-[220px] relative"
                    key={item.id}
                  >
                    <img
                      src={generateItemIconlink(item.img)}
                      alt={item.dname}
                      className="object-cover rounded-[20px] size-full"
                    />
                    <div className="content absolute bottom-[10px] inset-x-[10px]">
                      <span className="title">{item.dname}</span>
                      {/* Add cost here later */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-3xl flex items-center justify-center w-full h-96 border-[1px] border-slate-400 rounded-md md:md:text-lg">
                  There are no items to generate thumbnails in this category.
                </p>
              )}
            </div>
            {/* arrows */}
            <div className="absolute z-10 arrows top-[80%] right-[52%] w-[300px] max-w-[30%] gap-2 items-center flex">
              <button
                type="button"
                className="font-mono text-white transition-colors rounded-full size-10 bg-white/30 hover:bg-white hover:text-black"
              >
                prev
              </button>
              <button
                type="button"
                className="font-mono text-white transition-colors rounded-full size-10 bg-white/30 hover:bg-white hover:text-black"
              >
                next
              </button>
            </div>
          </section>
        )
      )}
    </>
  );
}

export default ItemsPage;
