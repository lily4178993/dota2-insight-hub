import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { selectHeroesState } from '../../redux/slices';
import { heroAbilitiesData, heroLoreData } from '../../constants';
import {
  attackDamageCalculation,
  attributeDictionary,
  generateHeroPosterlink,
} from '../../utils';
import { HeroAbilitiesSwiper, Pagination, StatCard } from '../../components';
import { usePagination } from '../../hooks';

function IndividualHeroPage({ hero }) {
  const [boxExpand, setBoxExpand] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    generateHeroPosterlink(hero.img, 'webm'),
  );
  const { heroes } = useSelector(selectHeroesState);
  const heroLoreKey = hero.name.toLowerCase().replace('npc_dota_hero_', '');
  const heroAbilities = heroAbilitiesData[hero.name].abilities;
  const primaryAttribute = hero.primary_attr;
  const moreHeroes = heroes.filter(
    (filteredHero) => filteredHero.primary_attr === primaryAttribute
      && filteredHero.id !== hero.id,
  );
  const itemsPerPage = 5;
  const { currentItems, handlePageChange, itemOffset } = usePagination(
    moreHeroes,
    itemsPerPage,
  );

  useEffect(() => {
    setVideoUrl(generateHeroPosterlink(hero.img, 'webm'));
  }, [hero]);

  // This effect will scroll to the top of the page every time the hero prop changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hero]);

  return (
    <div className="p-2 -mt-6 space-y-28 bg-slate-950">
      <div className="p-2 lg:w-1/2 lg:float-left ">
        <div className="flex items-start justify-around backdrop-blur-md">
          <div className="relative flex justify-between w-1/3 before:absolute before:bottom-0 before:w-full before:h-1 before:bg-gradient-to-tl from-green-600 to-green-800">
            Health
            <span className="text-right">
              {`${hero.base_health + 22 * hero.base_str} HP`}
            </span>
          </div>
          <div className="relative flex justify-between w-1/3 before:absolute before:bottom-0 before:w-full before:h-1 before:bg-gradient-to-tl from-blue-600 to-blue-800">
            Mana
            <span className="text-right">
              {`${hero.base_mana + 12 * hero.base_int} MP`}
            </span>
          </div>
        </div>
        <video
          src={videoUrl}
          poster={generateHeroPosterlink(
            `https://api.opendota.com${hero.img}`,
            'png',
          )}
          alt={hero.localized_name}
          autoPlay
          preload="auto"
          loop
          playsInline
          className="md:h-[70vh]"
        >
          <track kind="captions" />
        </video>
      </div>
      <div className="relative lg:float-right lg:w-1/2 bg-gradient-to-t from-slate-800">
        <h1 className="text-6xl font-medium text-center md:text-7xl">
          <span className="relative">{hero.localized_name}</span>
        </h1>
        <p className="absolute text-balance right-2 -top-4">Level 1</p>
        <p className="relative flex justify-between text-right text-balance">
          <span>{`Type: ${hero.attack_type}`}</span>
          <span>
            {`Primary Attribute: ${attributeDictionary(hero.primary_attr)}`}
          </span>
        </p>
      </div>
      <div className="flex items-start justify-between lg:float-right lg:w-1/2">
        <div
          className={`w-2/3 c pr-2 space-y-3 ${
            boxExpand && ' pb-4 bg-gradient-to-t from-slate-800 to-30%'
          }`}
        >
          <h2 className="text-3xl font-semibold">Hystory</h2>
          <p
            className={`text-lg leading-snug line-clamp-3 ${
              boxExpand
              && 'h-48 line-clamp-none overflow-y-auto overscroll-contain'
            }`}
          >
            {heroLoreData[heroLoreKey]}
          </p>
          <button
            type="button"
            onClick={() => setBoxExpand(!boxExpand)}
            className={`p-2 block bg-blue-950 rounded-sm hover:px-4 focus-visible:px-4 transition-all ${
              boxExpand && 'ml-auto'
            }`}
          >
            {boxExpand ? 'Show less' : 'Read Story'}
          </button>
        </div>
        <div className="w-1/2 space-y-2 text-right">
          <h2 className="inline-block w-full text-3xl font-semibold">Roles</h2>
          <ul className="space-x-4 space-y-2">
            {hero.roles.map((role) => (
              <li
                key={role}
                className="inline-block px-2 py-1 ml-auto text-right rounded-sm shadow-inner shadow-blue-500 text-balance"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap w-full py-4 space-x-8 space-y-8">
        <h2 className="inline-block w-full mt-6 mb-2 text-3xl font-semibold text-center lg:mt-40">
          Stats Details
        </h2>
        <ul className="flex flex-wrap items-start gap-2 lg:space-x-8 justify-evenly md:w-auto">
          <StatCard
            title="Basic Stats"
            stats={[
              ['Strength', `${hero.base_str} + ${hero.str_gain}`],
              ['Agility', `${hero.base_agi} + ${hero.agi_gain}`],
              ['Intelligence', `${hero.base_int} + ${hero.int_gain}`],
              ['Mana Resistance', hero.base_mr + 0.1 * hero.base_int],
              ['Equipment', hero.base_armor > 0 ? hero.base_armor : 'None'],
            ]}
          />
          <StatCard
            title="Regeneration Chances"
            stats={[
              [
                'Health',
                hero.base_health_regen > 0
                  ? `+${hero.base_health_regen} HP/second`
                  : `${hero.base_health_regen} HP/second`,
              ],
              [
                'Mana',
                hero.base_mana_regen > 0
                  ? `+${hero.base_mana_regen} MP/second`
                  : `${hero.base_mana_regen} MP/second`,
              ],
            ]}
          />
          <StatCard
            title="Attack Stats"
            stats={[
              [
                'Damage',
                `${attackDamageCalculation(
                  hero.primary_attr,
                  hero.base_attack_min,
                  hero.base_agi,
                  hero.base_str,
                  hero.base_int,
                )} ~ ${attackDamageCalculation(
                  hero.primary_attr,
                  hero.base_attack_max,
                  hero.base_agi,
                  hero.base_str,
                  hero.base_int,
                )}`,
              ],
              ['Destruction Range', hero.attack_range],
              ['Points Per Attack', hero.attack_point],
            ]}
          />
          <StatCard
            title="Speed Stats"
            stats={[
              ['Movement Speed', hero.move_speed],
              ['Projectile Speed', hero.projectile_speed],
            ]}
          />
          <StatCard
            title="Vision Range"
            stats={[
              ['Daytime', hero.day_vision],
              ['Nighttime', hero.night_vision],
            ]}
          />
        </ul>
      </div>
      <div className="relative flex flex-wrap items-stretch space-y-8 lg:space-y-0 deco-pattern before:absolute before:size-full before:top-0 before:left-0 before:bg-gradient-to-l from-slate-950 via-transparent to-slate-950 ">
        <div className="absolute top-0 left-0 hidden lg:block size-full bg-gradient-to-t from-slate-950 via-transparent to-slate-950 " />
        <div className="w-full px-4 lg:ml-auto lg:flex lg:items-center">
          <h2 className="text-3xl text-center font-semibold lg:tracking-wider inline-block w-full lg:w-1/3 mt-6 lg:mt-14 z-[1]">
            Abilities
          </h2>
          <HeroAbilitiesSwiper heroAbilities={heroAbilities} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="py-1 text-3xl border-t-2 rounded-md">
          Other heroes with
          {hero.primary_attr === 'all'
            ? ` ${attributeDictionary(hero.primary_attr)} attributes`
            : ` ${attributeDictionary(hero.primary_attr)} attribute`}
        </h2>
        <ul className="flex gap-4">
          {currentItems.map((hero) => (
            <li
              key={hero.id}
              className="flex flex-col items-center gap-4 transition-all group"
            >
              <Link
                to={`/heroes/${hero.localized_name}`}
                className="rounded-full outline-none ring-transparent group-hover:bg-slate-800"
              >
                <img
                  src={generateHeroPosterlink(
                    `https://api.opendota.com${hero.img}`,
                    'png',
                  )}
                  alt={hero.localized_name}
                  className="h-24 p-1 md:h-32 group-hover:scale-125"
                />
              </Link>
              <span className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                {hero.localized_name}
              </span>
            </li>
          ))}
        </ul>
        <Pagination
          itemsPerPage={itemsPerPage}
          itemCount={moreHeroes.length}
          onPageChange={handlePageChange}
          itemOffset={itemOffset}
        />
      </div>
    </div>
  );
}

IndividualHeroPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hero: PropTypes.object.isRequired,
};

export default IndividualHeroPage;
