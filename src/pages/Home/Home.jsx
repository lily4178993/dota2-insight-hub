import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components';
// import appMainFilterArray from '../../constants';
import './home.css';
import imageEx from '../../assets/image.png';
import { fetchHeroes } from '../../redux/slices/heroesSlice';
import { fetchItems } from '../../redux/slices/itemsSlice';
import { fetchMatches } from '../../redux/slices/matchesSlice';
import { fetchPlayers } from '../../redux/slices/playersSlice';

const Home = () => {
  const { heroes, status: statusHeroes } = useSelector((state) => state.heroes);
  const { items, status: statusItems } = useSelector((state) => state.items);
  const { matches, status: statusMatches } = useSelector((state) => state.matches);
  const { players, status: statusPlayers } = useSelector((state) => state.players);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusHeroes === 'idle') {
      dispatch(fetchHeroes());
    }
    if (statusItems === 'idle') {
      dispatch(fetchItems());
    }
    if (statusMatches === 'idle') {
      dispatch(fetchMatches());
    }
    if (statusPlayers === 'idle') {
      dispatch(fetchPlayers());
    }
  }, [
    dispatch,
    heroes.status,
    items.status,
    matches.status,
    players.status,
    statusHeroes,
    statusItems,
    statusMatches,
    statusPlayers,
  ]);

  return (
    <section className="home-container">
      <Card
        cardImage={imageEx}
        cardTitle="Heroes"
        cardCount={heroes ? heroes.length : 0}
      />
      <Card
        cardImage={imageEx}
        cardTitle="Items"
        cardCount={items ? items.length : 0}
      />
      <Card
        cardImage={imageEx}
        cardTitle="Pro Matches"
        cardCount={matches ? matches.length : 0}
      />
      <Card
        cardImage={imageEx}
        cardTitle="Pro Players"
        cardCount={players ? players.length : 0}
      />
    </section>
  );
};

export default Home;
