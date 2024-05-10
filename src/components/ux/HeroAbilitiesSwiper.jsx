import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination as swiperPagination } from 'swiper/modules';
import { generateHeroAbilityIconlink } from '../../utils';
import { abilitiesData } from '../../constants';

function HeroAbilitiesSwiper({ heroAbilities }) {
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
              {abilityDetailsKey.target_team && abilityDetailsKey.target_team.length > 0
              && (
              <div className="float-right">
                <h4 className="font-semibold my-1.5">Target</h4>
                <p>{abilityDetailsKey.target_team}</p>
              </div>
              )}
              {abilityDetailsKey.desc
              && (
                <div className="float-left">
                  <h4 className="font-semibold my-1.5">Description</h4>
                  <p className="text-white text-lg text-balance font-light leading-snug h-56 overflow-y-auto overscroll-contain ">{abilityDetailsKey.desc}</p>
                </div>
              )}
              {/*
                If abilityDetailsKey.attrib exist and abilityDetailsKey.attrib is not an empt array,
                  - Add a "View More" or "View Attributes" or "-->" button after the Description
                  - Add an event to that button so if user click,
                    - show the attributes values of the Hero ability
                    - Change or Add a new button "Close" or "X" to hide the attributes if clicked

                Idea of design:
                - The container to wrap all the attributes:
                  - Init: height = 0 <---> Description box = h-56
                  - End(appears on the screen): height = h-56 <---> Description box = 0
                  - Overflow vertical auto
                -Boxes for infos the attibutes:
                  - mobile width = 100% desktop width = 1/2
                  - Even box on left and entirely text align left
                  - Odd box on right and entirely text align right

                  REPRESNETATION OF THE BOXES ODD AND EVEN
                  -|
                   |-
                  -|
                   |-
                  -|
                   |-
               */}
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
