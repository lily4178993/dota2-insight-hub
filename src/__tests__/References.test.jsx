import React from 'react';
import { render } from '@testing-library/react';
import References from '../pages/References/References';

test('References component matches snapshot', () => {
  const { asFragment } = render(<References />);
  expect(asFragment()).toMatchSnapshot();
});
