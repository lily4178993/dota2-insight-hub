import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectHeroesState } from '../../redux/slices';
import {
  GridViewToggle,
  HeroCarousel,
  HeroGrid,
  HeroList,
  SearchPanel,
} from '../../components';

function HeroesPage() {
  const { detailsListName } = useParams();
  const { heroes } = useSelector(selectHeroesState);
  const [listViewOption, setListViewOption] = useState(false);
  const [filteredHeroes, setFilteredHeroes] = useState(heroes);

  useEffect(() => {
    const savedOption = localStorage.getItem('listViewOption');
    if (savedOption !== null) {
      setListViewOption(JSON.parse(savedOption));
    }
  }, []);

  useEffect(() => {
    setFilteredHeroes(heroes);
  }, [heroes]);

  const handleSearch = (searchQuery) => {
    const filtered = heroes.filter((hero) => hero
      .localized_name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredHeroes(filtered);
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
        <div className="flex justify-between items-center pr-2 mb-6">
          <GridViewToggle
            listViewOption={listViewOption}
            handleViewOptionChange={handleViewOptionChange}
          />
          {/* Search and Filter Panel */}
          <div className="hero-search-filter-panel">
            <SearchPanel onSearch={handleSearch} />

            {/* Filters */}
            {/* Dropdowns or checkboxes for filtering heroes by roles, attributes, etc. */}
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

      {/* Individual Hero Page - Template (Consider making this a separate component) */}
      {/* This section should be dynamic, displaying information of the hero selected */}
      <div className="individual-hero-page">
        {/* Hero Header */}
        {/* Display hero's name, main image, and a catchphrase or quote here */}

        {/* Tabs/Sections for Hero Details (Overview, Abilities, Strategy, etc.) */}
        <div className="hero-details-tabs">
          {/* Overview */}
          {/* Abilities */}
          {/* Strategy */}
          {/* Counter and Synergy */}
          {/* Media */}
          {/* Community */}
          {/* Implement tabs or sections here */}
        </div>

        {/* Sidebar with Quick Stats, Recent Changes, and Related Heroes */}
        <div className="hero-sidebar">
          {/* Quick Stats */}
          {/* Recent Changes */}
          {/* Related Heroes */}
          {/* Sidebar content goes here */}
        </div>
      </div>

      {/* Optional: Interactive Elements like Polls, Quizzes, Hero Comparison Tool */}
      <div className="interactive-elements">
        {/* Implement any interactive elements you plan to include */}
      </div>
    </div>
  );
}

export default HeroesPage;
