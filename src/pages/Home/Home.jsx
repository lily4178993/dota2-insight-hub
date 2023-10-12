import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Filter } from '../../components';
import { fetchHeroes } from '../../redux/slices/heroesSlice';
import { fetchItems } from '../../redux/slices/itemsSlice';
import { fetchMatches } from '../../redux/slices/matchesSlice';
import { fetchPlayers } from '../../redux/slices/playersSlice';
import heroesImage from '../../assets/angelSword.png';
import itemsImage from '../../assets/hammer.png';
import matchesImage from '../../assets/trophy.png';
import playersImage from '../../assets/gamepad.png';
import './home.css';

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
    statusHeroes,
    statusItems,
    statusMatches,
    statusPlayers,
  ]);

  const [filter, setFilter] = useState('Names');

  // Define a function to filter cards based on length
  const filterCardsByLength = () => {
    const data = [
      { cardTitle: 'Heroes', cardImage: heroesImage, cardCount: heroes ? heroes.length : 0 },
      { cardTitle: 'Items', cardImage: itemsImage, cardCount: items ? items.length : 0 },
      { cardTitle: 'Pro Matches', cardImage: matchesImage, cardCount: matches ? matches.length : 0 },
      { cardTitle: 'Pro Players', cardImage: playersImage, cardCount: players ? players.length : 0 },
    ];

    if (filter === 'Counts') {
    // Sort the cards by length in descending order
      return data.sort((a, b) => b.cardCount - a.cardCount);
    }

    return data;
  };

  const urlSpaceChecker = (stringParam) => {
    const stringWithoutSpaces = stringParam.replace(/\s/g, '');
    const firstLetter = stringWithoutSpaces.charAt(0).toLowerCase();
    return firstLetter + stringWithoutSpaces.slice(1);
  };

  return (
    <section>
      <Filter setFilter={setFilter} />
      <div className="home-container">
        {filterCardsByLength().map((cardData, index) => (
          <Link to={`/details/${urlSpaceChecker(`${cardData.cardTitle}`)}`} key={cardData.cardTitle}>
            <Card
              cardImage={cardData.cardImage}
              cardTitle={cardData.cardTitle}
              cardCount={cardData.cardCount}
              index={index % 2 === 0 ? 1 : 2}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
