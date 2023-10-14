import React from 'react';
import { render } from '@testing-library/react';
import ItemPresentation from '../components/DesignPresentations/ItemPresentation';

const sampleData = {
  img: '/sample-image.png',
  dname: 'Sample Item',
  qual: 'Sample Quality',
  lore: 'Sample Lore',
  notes: 'Sample Notes',
  cost: 100,
  mc: true,
  cd: 30,
  hint: ['Hint 1', 'Hint 2'],
};

test('ItemPresentation component matches snapshot', () => {
  const { asFragment } = render(<ItemPresentation data={sampleData} />);
  expect(asFragment()).toMatchSnapshot();
});
