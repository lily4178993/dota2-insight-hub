import React from 'react';
import PropTypes from 'prop-types';
import './proPlayerProfile.css';

const ProPlayerProfile = ({ data }) => (
  <div className="pro-player-profile">
    <h2>Dota 2 Pro Player Profile</h2>
    <div className="player-details">
      <div className="avatar">
        <img src={data.avatarfull} alt="Player Avatar" />
      </div>
      <div className="info">
        <h3>{data.personaname}</h3>
        <p>
          Steam ID:
          {' '}
          {data.steamid}
        </p>
        <p>
          Country:
          {' '}
          {data.loccountrycode}
        </p>
      </div>
    </div>
    <div className="team-details">
      <h3>Team</h3>
      <p>
        Team Name:
        {' '}
        {data.team_name}
      </p>
      <p>
        Team Tag:
        {' '}
        {data.team_tag}
      </p>
    </div>
    <div className="player-status">
      <h3>Player Status</h3>
      <p>
        Pro Player:
        {' '}
        {data.is_pro ? 'Yes' : 'No'}
      </p>
      <p>
        Locked:
        {' '}
        {data.is_locked ? 'Yes' : 'No'}
      </p>
      {data.is_locked && (
        <p>
          Locked Until:
          {' '}
          {data.locked_until}
        </p>
      )}
    </div>
  </div>
);

ProPlayerProfile.propTypes = {
  data: PropTypes.shape({
    avatarfull: PropTypes.string.isRequired,
    personaname: PropTypes.string.isRequired,
    steamid: PropTypes.string.isRequired,
    loccountrycode: PropTypes.string.isRequired,
    team_name: PropTypes.string.isRequired,
    team_tag: PropTypes.string.isRequired,
    is_pro: PropTypes.bool.isRequired,
    is_locked: PropTypes.bool.isRequired,
    locked_until: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProPlayerProfile;
