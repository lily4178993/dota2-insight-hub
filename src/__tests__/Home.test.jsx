import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home/Home';
import store from '../redux/store';

test('Home component snapshot', () => {
  const { asFragment } = render(
    <Router>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>,
  );

  expect(asFragment()).toMatchSnapshot();
});
