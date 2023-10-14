import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HeroInfo,
  ItemPresentation,
  MatchInfo,
  ProPlayerProfile,
} from '../../components';
import './detailsItem.css';

const DetailsItem = () => {
  const { detailsItemID } = useParams();
  const location = useLocation();
  const detailsListName = location.pathname.split('/')[2];
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
        return [];
    }
  });

  const renderComponent = () => {
    switch (detailsListName) {
      case 'heroes':
        return detailsData[detailsItemID] ? (
          <HeroInfo data={detailsData[detailsItemID - 1]} />
        ) : (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Hero&quot;s data not found
          </div>
        );
      case 'items':
        // eslint-disable-next-line no-case-declarations
        const selectedItem = detailsData.find((item) => item.key === detailsItemID);
        return selectedItem ? (
          <ItemPresentation data={selectedItem} />
        ) : (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Item&quot;s data not found
          </div>
        );
      case 'proMatches':
        // eslint-disable-next-line no-case-declarations
        const index = detailsData.findIndex((object) => object.match_id === Number(detailsItemID));
        if (index !== -1) return <MatchInfo data={detailsData[index]} />;
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Match&quot;s data not found
          </div>
        );
      case 'proPlayers':
        // eslint-disable-next-line no-case-declarations
        const index2 = detailsData.findIndex(
          (object) => object.account_id === Number(detailsItemID),
        );
        if (index2 !== -1) return <ProPlayerProfile data={detailsData[index2]} />;
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Player&quot;s data not found
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
};

export default DetailsItem;
