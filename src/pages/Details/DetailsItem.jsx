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
        if (detailsData && detailsData.length > 0 && detailsData[detailsItemID]) {
          return <HeroInfo data={detailsData[detailsItemID - 1]} />;
        }
        return (
          <div className="error-fetch">
            Something went wrong!
            <br />
            Hero&apos;s data not found
          </div>
        );
      case 'items':
        if (detailsData && detailsData.length > 0) {
          const selectedItem = detailsData.find((item) => item.key === detailsItemID);
          if (selectedItem) {
            return <ItemPresentation data={selectedItem} />;
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
        if (detailsData && detailsData.length > 0) {
          const index = detailsData.findIndex(
            (object) => object.match_id === Number(detailsItemID),
          );
          if (index !== -1) {
            return <MatchInfo data={detailsData[index]} />;
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
        if (detailsData && detailsData.length > 0) {
          const index2 = detailsData.findIndex(
            (object) => object.account_id === Number(detailsItemID),
          );
          if (index2 !== -1) {
            return <ProPlayerProfile data={detailsData[index2]} />;
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
};

export default DetailsItem;
