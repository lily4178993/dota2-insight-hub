import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Details from '../pages/Details/Details';
import store from '../redux/store';

test('Details component snapshot', () => {
  const { asFragment } = render(
    <Router>
      <Provider store={store}>
        <Details />
      </Provider>
    </Router>,
  );

  expect(asFragment()).toMatchSnapshot();
});
