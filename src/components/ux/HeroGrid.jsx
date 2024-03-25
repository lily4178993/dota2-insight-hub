import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import generateHeroPosterlink from '../../utils/generateHeroPosterlink';
import Pagination from './Pagination';
import { IconAgility, IconIntelligeence, IconStrength } from '../../assets';

function HeroGrid({ heroesData }) {
  const itemsPerPage = 8;
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
            <div key={hero.id} className="group chess-grid relative h-52 hover:!bg-slate-900 overflow-hidden">

              <img src={generateHeroPosterlink(`https://api.opendota.com${hero?.img}`)} alt={hero?.localized_name} className="w-36 h-36 mt-6 lg:mt-0 group-hover:scale-110 group-hover:mt-6 transition-all" />
              <div className="grid grid-rows-3 w-full h-full absolute bottom-0 right-0 place-items-end p-2">
                <h2 className="text-xl lg:text-2xl font-semibold mb-10 lg:mb-0">{hero?.localized_name}</h2>
                <div className="flex bg-pink-900/30">
                  <p className="grid place-items-center w-fit">
                    <img src={IconStrength} alt="Strength" className="w-10 h-10 object-cover p-2 -mb-2" />
                    {hero?.base_str}
                  </p>
                  <p className="grid place-items-center w-fit">
                    <img src={IconAgility} alt="Agility" className="w-10 h-10 object-cover p-2 -mb-2" />
                    {hero?.base_agi}
                  </p>
                  <p className="grid place-items-center w-fit">
                    <img src={IconIntelligeence} alt="Intelligence" className="w-10 h-10 object-cover p-2 -mb-2" />
                    {hero?.base_int}
                  </p>
                </div>
                <Link to={`/details/heroes/${hero.localized_name}`} className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mb-2 hover:before:skew-y-6 focus-visible:before:skew-y-6"><span className="relative text-white">View Details</span></Link>
              </div>
            </div>
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

HeroGrid.propTypes = {
  heroesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HeroGrid;
