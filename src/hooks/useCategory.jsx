import { useState, useEffect } from 'react';

const useCategory = (initialCategory, items) => {
  const [category, setCategory] = useState(initialCategory); // Store the current category name
  const [categorizedItems, setCategorizedItems] = useState([]); // Store the current category items

  useEffect(() => {
    // Update categorized items whenever the category or items change
    const filteredItems = items.filter((item) => item.category === category);
    setCategorizedItems(filteredItems);
  }, [category, items]);

  const updateCategory = (newCategory) => setCategory(newCategory);

  return {
    category,
    updateCategory,
    categorizedItems,
  };
};

export default useCategory;
