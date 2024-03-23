import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../../../components';
import generateHeroPosterlink from '../../../utils/generateHeroPosterlink';

function HeroesList({ heroesData }) {
  return (
    <section>
      <div>
        <h1>HeroesList</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
          labore quia optio velit autem perspiciatis magni!
        </p>
      </div>
      <div className="detailsList-container">
        {heroesData.length > 0 ? (
          heroesData.map((hero) => (
            <Link to={`/details/heroes/${hero.localized_name}`} key={hero.id}>
              <Card
                cardImage={generateHeroPosterlink(`https://api.opendota.com${hero?.img}`)}
                cardTitle={hero?.localized_name}
                cardCount={hero?.base_str}
              />
            </Link>
          ))
        )
          : (<p>List of Heroes not found</p>)}
      </div>
    </section>
  );
}

HeroesList.propTypes = {
  heroesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HeroesList;
