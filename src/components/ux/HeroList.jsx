import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { usePagination } from '../../hooks';
import Pagination from './Pagination';

function HeroList({ heroesData }) {
  const itemsPerPage = 12;
  const { currentItems, handlePageChange, itemOffset } = usePagination(
    heroesData,
    itemsPerPage,
  );

  return (
    <>
      <div className="detailsList-container">
        {currentItems.length > 0 ? (
          currentItems.map((hero) => (
            <Link
              to={`/heroes/${hero.localized_name}`}
              key={hero.id}
              className="chess-grid group"
            >
              <div className="flex items-center justify-between gap-2 p-1 transition-colors lg:px-3 hover:bg-slate-900 group-focus:bg-slate-900">
                <span className="text-xl md:text-2xl lg:text-3xl group-hover:underline group-focus:underline">
                  {hero.localized_name}
                </span>
                <ul className="flex items-center justify-between gap-2">
                  <li className="lg:text-2xl">
                    <span className="underline">STR</span>
                    <br />
                    {(hero?.base_str ?? 0) + (hero?.str_gain ?? 0)}
                  </li>
                  <li className="lg:text-2xl">
                    <span className="underline">AGI</span>
                    <br />
                    {(hero?.base_agi ?? 0) + (hero?.agi_gain ?? 0)}
                  </li>
                  <li className="lg:text-2xl">
                    <span className="underline">INT</span>
                    <br />
                    {(hero?.base_int ?? 0) + (hero?.int_gain ?? 0)}
                  </li>
                </ul>
              </div>
            </Link>
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

HeroList.propTypes = {
  heroesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HeroList;
