import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from '../components/Menu/Nav';

test('Nav component matches snapshot', () => {
  const component = renderer.create(
    <Router>
      <Nav />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
