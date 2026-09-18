/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */

import { useSelector } from 'react-redux';
import {
  BgCardHeroLarge,
  IconPackage,
  IconSquad,
  IconSword,
  testImage,
} from '../../assets';
import { CustomRanking } from '../../components';
import { selectHeroesState } from '../../redux/slices';

function Home() {
  const { heroes } = useSelector(selectHeroesState);
  const categories = [
    {
      title: 'Heroes',
      description:
        'Découvrez les profils, capacités et rôles de tous les héros',
      details: `DagCore Ranking System • ${heroes.length} heroes • Guides`,
      icon: IconSword,
      image: BgCardHeroLarge,
      color: '#7c6202',
      href: '/heroes',
    },
    {
      title: 'Items',
      description: 'Explorez les objets et leurs effets sur le gameplay',
      details: 'Arbres de craft • Combos optimaux • Meta analysis',
      icon: IconPackage,
      image: testImage,
      color: '#024c7e',
      href: '/items',
    },
    {
      title: 'Players',
      description: 'Consultez les profils et stats de la communauté',
      details: 'Classements • Statistiques • Historique des parties',
      icon: IconSquad,
      image: testImage,
      color: '#7c0202',
      href: '/players',
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
      <section className="relative w-full px-6 py-20 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl">Explore the Dota Universe</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Dive into our three main categories for a complete analysis
            experience.
          </p>
        </div>
        <div className="relative grid gap-8 mx-auto justify-center items-stretch md:grid-cols-3 max-w-[90vw] mb-16">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="relative overflow-hidden transition-all duration-500 bg-gray-900 cursor-pointer before:bg-gradient-to-t before:from-black before:to-black/20 size-full"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <img
                src={category.image}
                alt="heroes card"
                className="object-cover size-full"
              />
              <div className="absolute bottom-0 p-5 text-gray-300 size-full">
                content here Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Voluptate eaque voluptatum amet consequuntur hic earum
                nobis repellat, atque commodi labore quidem impedit ea ipsam,
                neque corrupti expedita voluptas. Aliquid, suscipit.
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* DagCore Ranking System */}
      <section className="relative w-full p-10">
        <CustomRanking />
      </section>
    </div>
  );
}

export default Home;
