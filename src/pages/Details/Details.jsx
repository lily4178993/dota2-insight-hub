import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ItemsList, ProPlayersList, PromatchesList } from './DataLists';
import { selectItemsState, selectMatchesState, selectPlayersState } from '../../redux/slices';
import './details.css';
import HeroesPage from '../Heroes/HeroesPage';

function Details() {
  const { detailsListName } = useParams();

  const { items } = useSelector(selectItemsState);
  const { matches } = useSelector(selectMatchesState);
  const { players } = useSelector(selectPlayersState);

  return (
    <section>
      <div>
        {detailsListName === 'heroes' && (<HeroesPage />)}
        {detailsListName === 'items' && (<ItemsList itemsData={items} />)}
        {detailsListName === 'proMatches' && (<PromatchesList proMatchesData={matches} />)}
        {detailsListName === 'proPlayers' && (<ProPlayersList proPlayersData={players} />)}
      </div>
    </section>
  );
}
export default Details;
