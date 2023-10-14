import React from 'react';
import { render } from '@testing-library/react';
import ProPlayerProfile from '../components/DesignPresentations/ProPlayerProfile';

test('ProPlayerProfile component matches snapshot', () => {
  const testData = {
    account_id: 123,
    avatarfull: 'avatar-url',
    personaname: 'PlayerName',
    steamid: 'steam-id',
    loccountrycode: 'US',
    team_name: 'TeamName',
    team_tag: 'TT',
    is_pro: true,
    is_locked: false,
  };

  const { asFragment } = render(<ProPlayerProfile data={testData} />);

  expect(asFragment()).toMatchSnapshot();
});
