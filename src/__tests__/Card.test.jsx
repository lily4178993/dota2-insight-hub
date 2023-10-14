import React from 'react';
import { render } from '@testing-library/react';
import Card from '../components/Card/Card';

test('Card component renders correctly', () => {
  const props = {
    cardImage: 'image.jpg',
    cardTitle: 'Sample Card',
    cardCount: 42,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  const { asFragment } = render(<Card {...props} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Card component renders with parser image correctly', () => {
  const props = {
    cardImage: 'image.jpg',
    cardTitle: 'Sample Card',
    cardCount: 42,
    isParser: true,
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  const { asFragment } = render(<Card {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
