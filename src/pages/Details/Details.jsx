import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card } from '../../components';
import matchesImage from '../../assets/trophy.png';
import './details.css';
import generateHeroPosterlink from '../../utils/generateHeroPosterlink';

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
          cardImage: generateHeroPosterlink(`https://api.opendota.com${data?.img}`),
          cardTitle: data?.localized_name,
          cardCount: data?.base_str,
          dataKey: data?.id,
        };
      case 'items':
        return {
          cardImage: `https://api.opendota.com${data?.img}`,
          cardTitle: data?.dname,
          cardCount: data?.cost || 'N/A',
          dataKey: data?.key,
        };
      case 'proMatches':
        return {
          cardImage: matchesImage,
          cardTitle: data?.dire_name || 'N/A',
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

  return (
    <section>
      <div className="detailsList-container">
        {detailsDataArray.length > 0 ? (
          detailsDataArray.map((data) => {
            const mappedData = mapDataProperties(data);
            if (!mappedData) {
              return null;
            }

            return (
              <Link to={`/details/${detailsListName}/${mappedData.dataKey}`} key={mappedData.dataKey}>
                <Card
                  cardImage={mappedData.cardImage}
                  cardTitle={mappedData.cardTitle}
                  cardCount={mappedData.cardCount}
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
