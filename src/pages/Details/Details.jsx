import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Filter } from '../../components';
import matchesImage from '../../assets/trophy.png';
import './details.css';

function Details() {
  const { detailsListName } = useParams();
  const detailsData = useSelector((state) => {
    switch (detailsListName) {
      case 'heroes':
        return state.heroes.heroes;
      case 'items':
        return state.items.items;
      case 'proMatches':
        return state.matches.matches;
      case 'proPlayers':
        return state.players.players;
      default:
        return null;
    }
  });

  // Ensure that detailsData is an array
  const detailsDataArray = Array.isArray(detailsData) ? detailsData : [];

  const mapDataProperties = (data) => {
    switch (detailsListName) {
      case 'heroes':
        return {
          cardImage: `https://api.opendota.com${data?.img}`,
          cardTitle: data?.localized_name,
          cardCount: data?.base_str,
          isParser: true,
          dataKey: data?.hero_id,
        };
      case 'items':
        return {
          cardImage: `https://api.opendota.com${data?.img}`,
          cardTitle: data?.dname,
          cardCount: data?.cost,
          dataKey: data?.key,
        };
      case 'proMatches':
        return {
          cardImage: matchesImage,
          cardTitle: data?.dire_name,
          cardCount: data?.dire_score,
          dataKey: data?.match_id,
        };
      case 'proPlayers':
        return {
          cardImage: data?.avatarmedium,
          cardTitle: data?.personaname,
          cardCount: data?.account_id,
          dataKey: data?.account_id,
        };
      default:
        return null;
    }
  };

  const [filter, setFilter] = useState('Names');

  // Define a function to filter and sort cards based on the chosen filter
  const filteredAndSortedCards = () => {
    // Filter cards based on the filter type
    let filteredCards = [...detailsDataArray].map(mapDataProperties);

    if (filter === 'Counts') {
      // Sort the cards by Count in descending order
      filteredCards = filteredCards.sort((a, b) => b.cardCount - a.cardCount);
    }

    return filteredCards;
  };

  return (
    <section>
      <Filter setFilter={setFilter} />
      <div className="detailsList-container">
        {detailsDataArray.length > 0 ? (
          filteredAndSortedCards().map((data) => {
            if (!data) {
              return null;
            }

            return (
              <Link to={`/details/${detailsListName}/${data?.dataKey}`} key={data?.dataKey}>
                <Card
                  cardImage={data?.cardImage}
                  cardTitle={data?.cardTitle}
                  cardCount={data?.cardCount}
                  isParser={data?.isParser}
                />
              </Link>
            );
          })
        ) : (
          'Data not found'
        )}
      </div>
    </section>
  );
}
export default Details;
