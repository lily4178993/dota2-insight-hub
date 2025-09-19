/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */

import {
  IconBattleGear,
  IconFiles,
  IconMultiTarget,
  IconTrophy2,
} from '../../assets';
import { ItemCard2 } from '../../components';

/* import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectHeroesState } from '../../redux/slices';
import { generateHeroPosterlink } from '../../utils';
 */
function Home() {
  /*   const { heroes } = useSelector(selectHeroesState);
  const numberOfHeroesToDisplay = heroes.slice(10, 18); */

  /*   const { items } = useSelector(selectAllItemsState);
  const categorizedItems = items.map((item) => ({
    item,
    categories: categorizeItem(item),
  })); */

  /*   const itemsToDisplay = categorizedItems
    .filter(({ categories }) =>
      categories.some(({ category }) => category === 'Magical')
    )
    .slice(0, 18)
    .map(({ item }) => ({
      id: item.id,
      image: generateItemIconlink(item.img),
    }));
 */
  const rankingCriteria = [
    {
      icon: IconMultiTarget,
      title: 'Strategic Complexity',
      description: 'Analysis of the learning curve and tactical depth',
    },
    {
      icon: IconTrophy2,
      title: 'Meta Impact',
      description:
        'Influence in the different phases of the game and compositions',
    },
    {
      icon: IconBattleGear,
      title: 'Carry Potential',
      description:
        'Ability to carry the team according to the role and situation',
    },
  ];
  return (
    <div className="flex flex-col bg-gradient-to-r from-black to-slate-900">
      {/* Banner */}
      <section className="relative w-full pt-8 pb-10 md:flex md:justify-between md:flex-row-reverse">
        Banner
      </section>
      {/* Disclaimer & Infos */}
      <section className="relative w-full pt-8 pb-10">
        About project & System Dag
      </section>
      {/* Categorization */}
      <section className="relative w-full pt-8 pb-10">
        Explore with 3 cards: Heroes, items, players
      </section>
      {/* New updates */}
      <section className="relative w-full pt-8 pb-10">
        New updates from the API
      </section>
      {/* DagCore Ranking System */}
      <section className="relative w-full p-10">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-6">
            <img
              src={IconFiles}
              alt="DagCore Ranking System"
              className="inline object-cover p-1 size-24"
            />
            <h2 className="text-[3.5rem]">DagCore Ranking System</h2>
          </div>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-400">
            Our unique approach to evaluating heroes goes beyond traditional
            statistics to analyze the true strategic impact within the Dota
            ecosystem. It’s a passionate reading of the game, crafted for fans
            who love to dig deeper.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3 max-w-[90vw] mb-16">
          {rankingCriteria.map((criteria) => (
            <ItemCard2
              key={criteria.title}
              imageSrc={criteria.icon}
              title={criteria.title}
              description={criteria.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
