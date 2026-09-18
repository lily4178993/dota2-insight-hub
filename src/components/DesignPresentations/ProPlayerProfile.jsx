import React from 'react';
import PropTypes from 'prop-types';
import './proPlayerProfile.css';

function ProPlayerProfile({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="error-fetch">
        Something went wrong!
        <br />
        Item&apos;s data not found
      </div>
    );
  }
  return (
    <div className="player-profile-container">
      <h2>Player Card</h2>
      <div className="player-profile">
        <div className="player-details">
          <div className="avatar">
            <img src={data.avatarfull} alt="Player Avatar" />
          </div>
          <div className="info">
            <h3>{`Pseudo: ${data.personaname}`}</h3>
            <p>
              <strong>ID:</strong>
              {' '}
              {data.account_id}
            </p>
            <p>
              <strong>Steam ID:</strong>
              {' '}
              {data.steamid}
            </p>
            <p>
              <strong>Country:</strong>
              {' '}
              {data.loccountrycode}
            </p>
          </div>
        </div>
        <div className="player-other-details">
          <div className="team-details">
            <h3>Team</h3>
            <p>
              <strong>Name:</strong>
              {' '}
              {data.team_name}
            </p>
            <p>
              <strong>Tag:</strong>
              {' '}
              {data.team_tag}
            </p>
          </div>
          <div className="player-status">
            <h3>Player Status</h3>
            <p>
              <strong>Pro Player:</strong>
              {' '}
              {data.is_pro ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Locked:</strong>
              {' '}
              {data.is_locked ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

ProPlayerProfile.propTypes = {
  data: PropTypes.shape({
    account_id: PropTypes.number.isRequired,
    avatarfull: PropTypes.string.isRequired,
    personaname: PropTypes.string.isRequired,
    steamid: PropTypes.string.isRequired,
    loccountrycode: PropTypes.string.isRequired,
    team_name: PropTypes.string.isRequired,
    team_tag: PropTypes.string.isRequired,
    is_pro: PropTypes.bool.isRequired,
    is_locked: PropTypes.bool.isRequired,
    length: PropTypes.number,
  }).isRequired,
};

export default ProPlayerProfile;
