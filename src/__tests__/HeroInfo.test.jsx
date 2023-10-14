import React from 'react';
import { render } from '@testing-library/react';
import HeroInfo from '../components/DesignPresentations/HeroInfo';

test('HeroInfo component matches snapshot', () => {
  const data = {
    localized_name: 'Pudge',
    img: 'pudge.png',
    primary_attr: 'str',
    attack_type: 'melee',
    roles: ['Disabler', 'Initiator'],
    base_health: 600,
    base_health_regen: 3.5,
    base_mana: 300,
    base_mana_regen: 1.5,
    base_armor: 2,
    base_mr: 25,
    base_attack_min: 50,
    base_attack_max: 70,
    base_str: 25,
    base_agi: 14,
    base_int: 14,
    str_gain: 3.2,
    agi_gain: 1.5,
    int_gain: 1.5,
    attack_range: 150,
    projectile_speed: 900,
    attack_rate: 1.7,
    base_attack_time: 1.7,
    attack_point: 0.5,
    move_speed: 285,
    day_vision: 1800,
    night_vision: 800,
    turbo_picks: 0,
    turbo_wins: 0,
    pro_pick: 200,
  };

  const { asFragment } = render(<HeroInfo data={data} />);
  expect(asFragment()).toMatchSnapshot();
});
