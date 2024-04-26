import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ItemPresentation,
  MatchInfo,
  ProPlayerProfile,
} from '../../components';
import './detailsItem.css';
import {
  selectHeroesState, selectItemsState, selectMatchesState, selectPlayersState,
} from '../../redux/slices';
import IndividualHeroPage from '../Heroes/IndividualHeroPage';

function DetailsItem() {
  const { detailsItemID } = useParams();
  const { detailsListName } = useParams();

  const { heroes } = useSelector(selectHeroesState);
  const { items } = useSelector(selectItemsState);
  const { matches } = useSelector(selectMatchesState);
  const { players } = useSelector(selectPlayersState);

  let index = '' || null;

  const renderComponent = () => {
    switch (detailsListName) {
      case 'heroes':
        if (heroes && heroes.length > 0) {
          index = heroes.find((hero) => hero.localized_name === detailsItemID);
          return <IndividualHeroPage hero={index} />;
        }
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Hero&apos;s data not found
          </div>
        );
      case 'items':
        if (items && items.length > 0) {
          index = items.findIndex((item) => item.key === detailsItemID);
          if (index) {
            return <ItemPresentation data={index} />;
          }
        }
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Item&apos;s data not found
          </div>
        );
      case 'proMatches':
        if (matches && matches.length > 0) {
          index = matches.findIndex(
            (object) => object.match_id === Number(detailsItemID),
          );
          if (index !== -1) {
            return <MatchInfo data={matches[index]} />;
          }
        }
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Match&apos;s data not found
          </div>
        );
      case 'proPlayers':
        if (players && players.length > 0) {
          index = players.findIndex(
            (object) => object.account_id === Number(detailsItemID),
          );
          if (index !== -1) {
            return <ProPlayerProfile data={players[index]} />;
          }
        }
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Player&apos;s data not found
          </div>
        );
      default:
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Details not found
          </div>
        );
    }
  };

  return <section>{renderComponent()}</section>;
}

export default DetailsItem;
