import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '../components';

test('Footer component matches snapshot', () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
