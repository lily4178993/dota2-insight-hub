import React from 'react';
import renderer from 'react-test-renderer';
import BackToButton from '../components/Button/BackToButton';

test('BackToButton component matches snapshot', () => {
  const component = renderer.create(<BackToButton />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
