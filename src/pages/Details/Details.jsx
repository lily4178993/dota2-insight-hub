import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProPlayersList, PromatchesList } from './DataLists';
import { selectMatchesState, selectPlayersState } from '../../redux/slices';
import './details.css';
import HeroesPage from '../Heroes/HeroesPage';
import ItemsPage from '../Items/ItemsPage';

function Details() {
  const { detailsListName } = useParams();
  const { matches } = useSelector(selectMatchesState);
  const { players } = useSelector(selectPlayersState);

  return (
    <section>
      <div>
        {detailsListName === 'heroes' && <HeroesPage />}
        {detailsListName === 'items' && <ItemsPage />}
        {detailsListName === 'proMatches' && (
          <PromatchesList proMatchesData={matches} />
        )}
        {detailsListName === 'proPlayers' && (
          <ProPlayersList proPlayersData={players} />
        )}
      </div>
    </section>
  );
}
export default Details;
