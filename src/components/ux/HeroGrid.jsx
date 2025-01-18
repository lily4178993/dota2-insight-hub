import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';
import generateHeroPosterlink from '../../utils/generateHeroPosterlink';
import Pagination from './Pagination';
import { IconAgility, IconIntelligeence, IconStrength } from '../../assets';

function HeroGrid({ heroesData }) {
  const itemsPerPage = 8;
  const { currentItems, handlePageChange, itemOffset } = usePagination(
    heroesData,
    itemsPerPage,
  );

  return (
    <>
      <div className="detailsList-container">
        {currentItems.length > 0 ? (
          currentItems.map((hero) => (
            <div
              key={hero.id}
              className="group chess-grid relative h-52 hover:!bg-slate-900 overflow-hidden"
            >
              <img
                src={generateHeroPosterlink(
                  `https://api.opendota.com${hero?.img}`,
                  'png',
                )}
                alt={hero?.localized_name}
                className="mt-6 transition-all w-36 h-36 lg:mt-0 group-hover:scale-110 group-hover:mt-6"
              />
              <div className="absolute bottom-0 right-0 grid w-full h-full grid-rows-3 p-2 place-items-end">
                <h2 className="mb-10 text-xl font-semibold lg:text-2xl lg:mb-0">
                  {hero?.localized_name}
                </h2>
                <div className="flex bg-pink-900/30">
                  <p className="grid place-items-center w-fit">
                    <img
                      src={IconStrength}
                      alt="Strength"
                      className="object-cover w-10 h-10 p-2 -mb-2"
                    />
                    {(hero?.base_str ?? 0) + (hero?.str_gain ?? 0)}
                  </p>
                  <p className="grid place-items-center w-fit">
                    <img
                      src={IconAgility}
                      alt="Agility"
                      className="object-cover w-10 h-10 p-2 -mb-2"
                    />
                    {(hero?.base_agi ?? 0) + (hero?.agi_gain ?? 0)}
                  </p>
                  <p className="grid place-items-center w-fit">
                    <img
                      src={IconIntelligeence}
                      alt="Intelligence"
                      className="object-cover w-10 h-10 p-2 -mb-2"
                    />
                    {(hero?.base_int ?? 0) + (hero?.int_gain ?? 0)}
                  </p>
                </div>
                <Link
                  to={`/heroes/${hero.localized_name}`}
                  className="relative inline-block mb-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 hover:before:skew-y-6 focus-visible:before:skew-y-6"
                >
                  <span className="relative text-white">View Details</span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-3xl flex items-center justify-center w-full h-96 border-[1px] border-slate-400 rounded-md">
            List of Heroes not found
          </p>
        )}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        itemCount={heroesData.length}
        onPageChange={handlePageChange}
        itemOffset={itemOffset}
      />
    </>
  );
}

HeroGrid.propTypes = {
  heroesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HeroGrid;
