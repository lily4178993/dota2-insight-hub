import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header/Header';

test('Header component renders correctly', () => {
  const { container } = render(
    <Router>
      <Header />
    </Router>,
  );
  expect(container).toMatchSnapshot();
});
