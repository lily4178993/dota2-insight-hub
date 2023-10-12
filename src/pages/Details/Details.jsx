import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card/* , Filter */ } from '../../components';
import heroesImage from '../../assets/angelSword.png';

const Details = () => {
  const { detailsListName } = useParams();
  return (
    <>
      Details:
      {' '}
      {detailsListName || 'Data not found'}
      <Link to="/">
        <Card
          cardImage={heroesImage}
          cardTitle="A title"
          cardCount={2}
          index={1 || 2}
        />
      </Link>
    </>
  );
};
export default Details;
