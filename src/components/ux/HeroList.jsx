import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function HeroList({ heroesData }) {
  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = heroesData.slice(itemOffset, endOffset);

  const handlePageChange = (newOffset) => {
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="detailsList-container">
        {currentItems.length > 0 ? (
          currentItems.map((hero) => (
            <Link to={`/details/heroes/${hero.localized_name}`} key={hero.id} className="chess-grid group">
              <div className="flex gap-2 justify-between items-center p-1 lg:px-3 hover:bg-slate-900 group-focus:bg-slate-900 transition-colors">
                <span className="text-xl md:text-2xl lg:text-3xl group-hover:underline group-focus:underline">{hero.localized_name}</span>
                <ul className="flex gap-2 justify-between items-center">
                  <li className="lg:text-2xl">
                    <span className="underline">STR</span>
                    <br />
                    {hero.base_str}
                  </li>
                  <li className="lg:text-2xl">
                    <span className="underline">AGI</span>
                    <br />
                    {hero.base_agi}
                  </li>
                  <li className="lg:text-2xl">
                    <span className="underline">INT</span>
                    <br />
                    {hero.base_int}
                  </li>
                </ul>
              </div>
            </Link>
          ))
        )
          : (<p className="text-3xl flex items-center justify-center w-full h-96 border-[1px] border-slate-400 rounded-md">List of Heroes not found</p>)}
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
