import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHeroes,
  fetchItems,
  fetchMatches,
  fetchPlayers,
  selectHeroesState,
  selectItemsState,
  selectMatchesState,
  selectPlayersState,
} from '../../redux/slices';
import { Card } from '../../components';
import urlSpaceChecker from '../../utils/urlSpaceChecker';
import heroesImage from '../../assets/angelSword.png';
import itemsImage from '../../assets/hammer.png';
import matchesImage from '../../assets/trophy.png';
import playersImage from '../../assets/gamepad.png';
import './home.css';

function Home() {
  const { heroes, loading: loadingHeroes, error: errorHeroes } = useSelector(selectHeroesState);
  const { items, loading: loadingItems, error: errorItems } = useSelector(selectItemsState);
  const { matches, loading: loadingMatches, error: errorMatches } = useSelector(selectMatchesState);
  const { players, loading: loadingPlayers, error: errorPlayers } = useSelector(selectPlayersState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingHeroes === false && heroes.length === 0) {
      dispatch(fetchHeroes());
    }
    if (loadingItems === false && items.length === 0) {
      dispatch(fetchItems());
    }
    if (loadingMatches === false && matches.length === 0) {
      dispatch(fetchMatches());
    }
    if (loadingPlayers === false && players.length === 0) {
      dispatch(fetchPlayers());
    }
  }, [
    dispatch,
    loadingHeroes,
    loadingItems,
    loadingPlayers,
    players.length,
    loadingMatches,
    matches.length,
    heroes.length,
    items.length,
  ]);

  /* const [filter, setFilter] = useState('Names');

  // Define a function to filter cards based on length
  const filterCardsByLength = () => {
    const data = [
      { cardTitle: 'Heroes', cardImage: heroesImage, cardCount: heroes ? heroes.length : 0 },
      { cardTitle: 'Items', cardImage: itemsImage, cardCount: items ? items.length : 0 },
      { cardTitle: 'Pro Matches',
      cardImage: matchesImage, cardCount: matches ? matches.length : 0 },
      { cardTitle: 'Pro Players', cardImage:
      playersImage, cardCount: players ? players.length : 0 },
    ];

    if (filter === 'Counts') {
    // Sort the cards by length in descending order
      return data.sort((a, b) => b.cardCount - a.cardCount);
    }

    return data;
  };
 */
  const data = [
    {
      cardTitle: 'Heroes',
      cardImage: heroesImage,
      cardCount: loadingHeroes ? 'Loading...' : heroes.length,
    },
    {
      cardTitle: 'Items',
      cardImage: itemsImage,
      cardCount: loadingItems ? 'Loading...' : items.length,
    },
    {
      cardTitle: 'Pro Matches',
      cardImage: matchesImage,
      cardCount: loadingMatches ? 'Loading...' : matches.length,
    },
    {
      cardTitle: 'Pro Players',
      cardImage: playersImage,
      cardCount: loadingPlayers ? 'Loading...' : players.length,
    },
  ];
  return (
    <section>
      {/* <Filter setFilter={setFilter} /> */}
      <div className="home-container">
        {data.map((cardData) => (
          <Link to={`/details/${urlSpaceChecker(`${cardData.cardTitle}`)}`} key={cardData.cardTitle}>
            <Card
              cardImage={cardData.cardImage}
              cardTitle={cardData.cardTitle}
              cardCount={cardData.cardCount}
            />
          </Link>
        ))}
      </div>
      {errorHeroes && <p>{errorHeroes}</p>}
      {errorItems && <p>{errorItems}</p>}
      {errorMatches && <p>{errorMatches}</p>}
      {errorPlayers && <p>{errorPlayers}</p>}
    </section>
  );
}

export default Home;
