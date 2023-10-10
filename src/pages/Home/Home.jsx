import React from 'react';
import { Card } from '../../components';
import appMainFilterArray from '../../constants';
import './home.css';
import imageEx from '../../assets/image.png';

const Home = () => (
  <section className="home-container">
    {appMainFilterArray.map((appMainFilterElement) => (
      <Card
        key={appMainFilterElement.title}
        cardImage={imageEx}
        cardTitle={appMainFilterElement.title}
        cardCount={appMainFilterElement.count}
      />
    ))}
  </section>
);

export default Home;
