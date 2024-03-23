import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HeroesList, ItemsList, ProPlayersList, PromatchesList,
} from './DataLists';
import {
  selectHeroesState, selectItemsState, selectMatchesState, selectPlayersState,
} from '../../redux/slices';
import './details.css';

function Details() {
  const { detailsListName } = useParams();

  const { heroes } = useSelector(selectHeroesState);
  const { items } = useSelector(selectItemsState);
  const { matches } = useSelector(selectMatchesState);
  const { players } = useSelector(selectPlayersState);

  return (
    <section>
      <div>
        {detailsListName === 'heroes' && (<HeroesList heroesData={heroes} />)}
        {detailsListName === 'items' && (<ItemsList itemsData={items} />)}
        {detailsListName === 'proMatches' && (<PromatchesList proMatchesData={matches} />)}
        {detailsListName === 'proPlayers' && (<ProPlayersList proPlayersData={players} />)}
      </div>
    </section>
  );
}
export default Details;
