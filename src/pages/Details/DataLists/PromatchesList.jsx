import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../../../components';
import matchesImage from '../../../assets/trophy.png';

function PromatchesList({ proMatchesData }) {
  return (
    <section>
      <div>
        <h1>PromatchesList</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
          labore quia optio velit autem perspiciatis magni!
        </p>
      </div>
      <div className="detailsList-container">
        {proMatchesData.length > 0 ? (
          proMatchesData.map((promatch) => (
            <Link to={`/details/proMatches/${promatch.match_id}`} key={promatch.match_id}>
              <Card
                cardImage={matchesImage}
                cardTitle={promatch?.dire_name || 'N/A'}
                cardCount={promatch?.dire_score}
              />
            </Link>
          ))
        )
          : (<p>List of Pro Matches not found</p>)}
      </div>
    </section>
  );
}

PromatchesList.propTypes = {
  proMatchesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default PromatchesList;
