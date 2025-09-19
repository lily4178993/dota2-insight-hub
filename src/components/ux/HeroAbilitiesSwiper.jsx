import { useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination as swiperPagination } from 'swiper/modules';
import { generateHeroAbilityIconlink } from '../../utils';
import { abilitiesData } from '../../constants';

function HeroAbilitiesSwiper({ heroAbilities }) {
  const [isToggle, setIsToggle] = useState({});

  const handleToggle = (ability) => {
    setIsToggle((prev) => ({ ...prev, [ability]: !prev[ability] }));
  };

  const handleSlideChange = () => {
    setIsToggle({});
  };

  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      pagination
      modules={[EffectCoverflow, swiperPagination]}
      onSlideChange={handleSlideChange}
      className="mySwiper my-10"
    >
      {heroAbilities.map((ability) => {
        const abilityDetailsKey = abilitiesData[ability];
        if (abilityDetailsKey.behavior?.includes('Hidden')) {
          return null;
        }
        return (
          <SwiperSlide key={ability} className="!w-[18rem] md:!w-[27rem] !h-[33.25rem] relative my-16 mx-auto px-4 py-5 flex flex-col transition-all ease-in-out bg-slate-700/50 backdrop-blur-sm">
            <div className="-top-16 z-[1] relative">
              <img
                src={generateHeroAbilityIconlink(abilityDetailsKey.img)}
                alt={abilityDetailsKey.dname}
                className=" size-[7rem] md:size-[10rem]  rounded"
              />
              <h3 className="text-white text-2xl font-medium absolute top-2 right-0">
                {abilityDetailsKey.dname}
              </h3>
              <p className="text-right font-medium opacity-90 absolute bottom-2 right-0">
                Damage Type
                <span className="font-normal block">{` ${abilityDetailsKey.dmg_type ? abilityDetailsKey.dmg_type : 'None'}`}</span>
              </p>
            </div>
            <div className="-mt-10 h-64">
              {!isToggle[ability] && (
              <div className="float-left">
                <h4 className="font-semibold my-1.5">Actions</h4>
                {typeof abilityDetailsKey.behavior === 'string' ? (
                  <p className="w-fit px-2 py-1 rounded-sm shadow-inner shadow-blue-500">{abilityDetailsKey.behavior}</p>
                ) : (
                  <ul className="flex items-center gap-2">
                    {abilityDetailsKey.behavior.map((behavior) => (
                      <li
                        key={behavior}
                        className="w-fit px-2 py-1 rounded-sm shadow-inner shadow-blue-500"
                      >
                        {behavior}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              )}
              {abilityDetailsKey.target_team && abilityDetailsKey.target_team.length > 0
               && !isToggle[ability] && (
               <div className="float-right">
                 <h4 className="font-semibold my-1.5">Target</h4>
                 <p>{abilityDetailsKey.target_team}</p>
               </div>
              )}
              {abilityDetailsKey.desc
              && (
                <div className="float-left">
                  {!isToggle[ability] && (
                  <>
                    <h4 className="font-semibold my-1.5">Description</h4>
                    <p className="text-white text-lg text-balance font-light leading-snug h-56 overflow-y-auto overscroll-contain ">{abilityDetailsKey.desc}</p>
                  </>
                  )}
                  {abilityDetailsKey.attrib && abilityDetailsKey.attrib.length > 0 && (
                    <button
                      type="button"
                      className={`p-2 block bg-blue-950 rounded-sm hover:px-4 focus-visible:px-4 transition-all absolute bottom-0 right-0 z-[10] ${isToggle[ability] ? 'bg-red-700' : 'bg-blue-950'}`}
                      onClick={() => handleToggle(ability)}
                    >
                      {isToggle[ability] ? 'Close' : 'View Attributes'}
                    </button>
                  )}
                </div>
              )}
              {abilityDetailsKey.attrib && abilityDetailsKey.attrib.length > 0 && isToggle[ability]
               && (
                 <div className="h-full">
                   <h4 className="font-semibold my-1.5">Attributes</h4>
                   <ul className="flex flex-wrap gap-2 h-full overflow-y-auto overscroll-contain">
                     {abilityDetailsKey.attrib.map((attribute, index) => (
                       <li
                         key={attribute.index}
                         className={`w-1/2 h-fit px-2 py-1 rounded-sm shadow-inner shadow-blue-500 ${index % 2 === 0 ? 'ml-auto text-right' : ''}`}
                       >
                         {`${attribute.header} ${attribute.value}`}
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

HeroAbilitiesSwiper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  heroAbilities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HeroAbilitiesSwiper;
