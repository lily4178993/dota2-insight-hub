import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter/Filter';

test('Filter component matches snapshot', () => {
  const setFilter = jest.fn();
  const { container, getByTitle } = render(<Filter setFilter={setFilter} />);

  const filterButton = getByTitle('Filter');
  fireEvent.click(filterButton);

  const filterByNameButton = getByTitle('Filter by Names');
  const filterByCountsButton = getByTitle('Filter by Counts');

  expect(container).toMatchSnapshot();

  fireEvent.click(filterByNameButton);
  expect(container).toMatchSnapshot();

  fireEvent.click(filterButton);
  fireEvent.click(filterByCountsButton);
  expect(container).toMatchSnapshot();
});
