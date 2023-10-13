import React from 'react';
import PropTypes from 'prop-types';

const HeroInfo = ({ data }) => (
  <div className="hero-info">
    <h2>
      {data.localized_name}
      {' '}
      - Hero Details
    </h2>
    <div className="hero-image">
      <img src={data.img} alt={data.localized_name} />
    </div>
    <div className="hero-details">
      <ul>
        <li>
          <strong>Primary Attribute:</strong>
          {' '}
          {data.primary_attr}
        </li>
        <li>
          <strong>Attack Type:</strong>
          {' '}
          {data.attack_type}
        </li>
        <li>
          <strong>Roles:</strong>
          {' '}
          {Array.isArray(data.roles) ? data.roles.join(', ') : data.roles}
        </li>
        <li>
          <strong>Base Health:</strong>
          {' '}
          {data.base_health}
        </li>
        <li>
          <strong>Base Health Regeneration:</strong>
          {' '}
          {data.base_health_regen}
        </li>
        <li>
          <strong>Base Mana:</strong>
          {' '}
          {data.base_mana}
        </li>
        <li>
          <strong>Base Mana Regeneration:</strong>
          {' '}
          {data.base_mana_regen}
        </li>
        <li>
          <strong>Base Armor:</strong>
          {' '}
          {data.base_armor}
        </li>
        <li>
          <strong>Base Magic Resistance:</strong>
          {' '}
          {data.base_mr}
        </li>
      </ul>
      <ul>
        <li>
          <strong>Base Attack Damage:</strong>
          {' '}
          {data.base_attack_min}
          {' '}
          -
          {' '}
          {data.base_attack_max}
        </li>
        <li>
          <strong>Strength:</strong>
          {' '}
          {data.base_str}
        </li>
        <li>
          <strong>Agility:</strong>
          {' '}
          {data.base_agi}
        </li>
        <li>
          <strong>Intelligence:</strong>
          {' '}
          {data.base_int}
        </li>
        <li>
          <strong>Strength Gain:</strong>
          {' '}
          {data.str_gain}
        </li>
        <li>
          <strong>Agility Gain:</strong>
          {' '}
          {data.agi_gain}
        </li>
        <li>
          <strong>Intelligence Gain:</strong>
          {' '}
          {data.int_gain}
        </li>
      </ul>
      <ul>
        <li>
          <strong>Attack Range:</strong>
          {' '}
          {data.attack_range}
        </li>
        <li>
          <strong>Projectile Speed:</strong>
          {' '}
          {data.projectile_speed}
        </li>
        <li>
          <strong>Attack Rate:</strong>
          {' '}
          {data.attack_rate}
        </li>
        <li>
          <strong>Base Attack Time:</strong>
          {' '}
          {data.base_attack_time}
        </li>
        <li>
          <strong>Attack Point:</strong>
          {' '}
          {data.attack_point}
        </li>
        <li>
          <strong>Move Speed:</strong>
          {' '}
          {data.move_speed}
        </li>
        <li>
          <strong>Turn Rate:</strong>
          {' '}
          {data.turn_rate}
        </li>
      </ul>
    </div>
  </div>
);

HeroInfo.propTypes = {
  data: PropTypes.shape({
    localized_name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    primary_attr: PropTypes.string.isRequired,
    attack_type: PropTypes.string.isRequired,
    roles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    base_health: PropTypes.number.isRequired,
    base_health_regen: PropTypes.number.isRequired,
    base_mana: PropTypes.number.isRequired,
    base_mana_regen: PropTypes.number.isRequired,
    base_armor: PropTypes.number.isRequired,
    base_mr: PropTypes.number.isRequired,
    base_attack_min: PropTypes.number.isRequired,
    base_attack_max: PropTypes.number.isRequired,
    base_str: PropTypes.number.isRequired,
    base_agi: PropTypes.number.isRequired,
    base_int: PropTypes.number.isRequired,
    str_gain: PropTypes.number.isRequired,
    agi_gain: PropTypes.number.isRequired,
    int_gain: PropTypes.number.isRequired,
    attack_range: PropTypes.number.isRequired,
    projectile_speed: PropTypes.number.isRequired,
    attack_rate: PropTypes.number.isRequired,
    base_attack_time: PropTypes.number.isRequired,
    attack_point: PropTypes.number.isRequired,
    move_speed: PropTypes.number.isRequired,
    turn_rate: PropTypes.number.isRequired,
  }).isRequired,
};

export default HeroInfo;
