import React from 'react';
import { render } from '@testing-library/react';
import MatchInfo from '../components/DesignPresentations/MatchInfo';

const sampleData = {
  match_id: 12345,
  duration: 1800,
  start_time: 1634119200,
  league_name: 'Sample League',
  radiant_name: 'Radiant Team',
  dire_name: 'Dire Team',
  radiant_score: 25,
  dire_score: 20,
};

test('MatchInfo component matches snapshot', () => {
  const { asFragment } = render(<MatchInfo data={sampleData} />);
  expect(asFragment()).toMatchSnapshot();
});
