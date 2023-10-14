import React from 'react';
import { render } from '@testing-library/react';
import AboutMe from '../pages/About/AboutMe';

test('AboutMe component matches snapshot', () => {
  const { asFragment } = render(<AboutMe />);
  expect(asFragment()).toMatchSnapshot();
});
