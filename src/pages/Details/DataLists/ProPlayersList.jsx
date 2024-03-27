import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../../../components';

function ProPlayersList({ proPlayersData }) {
  return (
    <section>
      <div>
        <h1>ProPlayersList</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
          labore quia optio velit autem perspiciatis magni!
        </p>
      </div>
      <div className="detailsList-container">
        {proPlayersData.length > 0 ? (
          proPlayersData.map((proplayer) => (
            <Link to={`/details/proPlayers/${proplayer.account_id}`} key={proplayer.account_id}>
              <Card
                cardImage={proplayer?.avatarmedium}
                cardTitle={proplayer?.personaname}
                cardCount={proplayer?.account_id}
              />
            </Link>
          ))
        )
          : (<p>List of pro players not found</p>)}
      </div>
    </section>
  );
}

ProPlayersList.propTypes = {
  proPlayersData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ProPlayersList;
