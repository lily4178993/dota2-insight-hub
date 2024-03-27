import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectHeroesState } from '../../redux/slices';
import useFilteredData from '../../hooks/useFilteredData';
import {
  FilterCheckboxesPanel,
  GridViewToggle,
  HeroCarousel,
  HeroGrid,
  HeroList,
  SearchPanel,
} from '../../components';
import { heroFilters } from '../../constants/constant';

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

  const checkboxFilters = useMemo(() => filters.filter((f) => f.checked), [filters]);

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
      <div className="w-full min-h-screen -mt-5 pb-10 sm:pb-0 sm:h-screen bg-black">
        <HeroCarousel />
      </div>

      {/* Hero Grid or List */}
      <section className="hero-grid-list pt-20 sm:pt-4 lg:pt-24 pb-20 bg-gradient-to-t from-black/50 to-black" id="explore-heroes">
        <div className="text-center text-balance mb-8 lg:mb-10 px-2">
          <h2 className="text-4xl md:text-5xl font-semibold mb-2">Explore the Heroes</h2>
          <p className="text-2xl md:text-3xl">Browse, search, and find details on every hero in the Dota 2 universe.</p>
        </div>
        <div className="relative w-full flex justify-between items-center pr-2 mb-6">
          <GridViewToggle
            listViewOption={listViewOption}
            handleViewOptionChange={handleViewOptionChange}
          />
          {/* Search and Filter Panel */}
          <div className="flex gap-1 items-center justify-between h-auto">
            <SearchPanel onSearch={handleSearch} />
            <FilterCheckboxesPanel options={filters} onFilterChange={handleFilterChange} />
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
