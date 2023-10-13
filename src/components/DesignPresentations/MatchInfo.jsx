import React from 'react';
import PropTypes from 'prop-types';
import './matchInfo.css';

const MatchInfo = ({ data }) => (
  <div className="match-info">
    <h2>Match Details</h2>
    <ul>
      <li>
        <strong>Match ID:</strong>
        {' '}
        {data.match_id}
      </li>
      <li>
        <strong>Duration:</strong>
        {' '}
        {data.duration}
        {' '}
        seconds
      </li>
      <li>
        <strong>Start Time:</strong>
        {' '}
        {new Date(data.start_time * 1000).toLocaleString()}
      </li>
      <li>
        <strong>League:</strong>
        {' '}
        {data.league_name}
      </li>
      <li>
        <strong>Radiant Team:</strong>
        {' '}
        {data.radiant_name}
      </li>
      <li>
        <strong>Dire Team:</strong>
        {' '}
        {data.dire_name}
      </li>
      <li>
        <strong>Radiant Score:</strong>
        {' '}
        {data.radiant_score}
      </li>
      <li>
        <strong>Dire Score:</strong>
        {' '}
        {data.dire_score}
      </li>
    </ul>
  </div>
);

MatchInfo.propTypes = {
  data: PropTypes.shape({
    match_id: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    start_time: PropTypes.number.isRequired,
    league_name: PropTypes.string.isRequired,
    radiant_name: PropTypes.string.isRequired,
    dire_name: PropTypes.string.isRequired,
    radiant_score: PropTypes.number.isRequired,
    dire_score: PropTypes.number.isRequired,
  }).isRequired,
};

export default MatchInfo;
