/* eslint-disable comma-dangle */
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { Parallax } from 'swiper/modules';
import { selectHeroesState } from '../../redux/slices';
import useFilteredData from '../../hooks/useFilteredData';
import {
  FilterCheckboxesPanel,
  GridViewToggle,
  /* HeroCarousel, */
  HeroGrid,
  HeroList,
  SearchPanel,
} from '../../components';
// import { BannerHeroes4 } from '../../assets';
import { heroFilters /* , heroesSlidesData */ } from '../../constants';

function HeroesPage() {
  const { detailsListName } = useParams();
  const { heroes } = useSelector(selectHeroesState);
  const [listViewOption, setListViewOption] = useState(false);
  const [filters, setFilters] = useState(heroFilters);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedOption = localStorage.getItem('listViewOption');
    if (savedOption !== null) {
      setListViewOption(JSON.parse(savedOption));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkboxFilters = useMemo(
    () => filters.filter((f) => f.checked),
    [filters]
  );

  const filteredHeroes = useFilteredData(heroes, checkboxFilters, searchQuery);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleViewOptionChange = (option) => {
    setListViewOption(option);
    localStorage.setItem('listViewOption', JSON.stringify(option));
  };

  return (
    <div className="heroes-page-container">
      {/* Hero Grid or List */}
      <section
        className="px-2 pt-20 pb-20 hero-grid-list md:px-16 sm:pt-4 lg:pt-24 bg-gradient-to-t from-black/50 to-black"
        id="explore-heroes"
      >
        <div className="flex flex-col md:flex-row  items-start  gap-10  mb-8 md:*:text-left lg:mb-10 text-justify text-pretty  md:justify-between">
          <div className="flex-auto md:flex-1">
            <h2 className="mb-2 text-4xl font-light lg:text-5xl">
              Explore the Heroes
            </h2>
            <p className="text-xl">
              Browse, search, and find details on every hero in this universe.
            </p>
          </div>
          <p className="text-xl md:font-thin w-full md:w-[40vw]flex-auto md:flex-1">
            Begin your journey through the vast landscapes of Dota 2. Here,
            heroes await to claim their glory. Discover your champion and forge
            your path to victory.
          </p>
        </div>
        <div className="relative flex items-center justify-between w-full pr-2 mb-6">
          <GridViewToggle
            listViewOption={listViewOption}
            handleViewOptionChange={handleViewOptionChange}
          />
          {/* Search and Filter Panel */}
          <div className="flex items-center justify-between h-auto gap-1">
            <SearchPanel onSearch={handleSearch} />
            <FilterCheckboxesPanel
              options={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Grid or List View */}
        <div className="min-h-96">
          {!listViewOption && detailsListName === 'heroes' && (
            <HeroGrid heroesData={filteredHeroes} />
          )}
          {listViewOption && detailsListName === 'heroes' && (
            <HeroList heroesData={filteredHeroes} />
          )}
        </div>
      </section>
    </div>
  );
}

export default HeroesPage;
