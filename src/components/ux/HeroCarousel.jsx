import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax } from 'swiper/modules';

function HeroCarousel({ slidesData, backgroundImage }) {
  return (
    <Swiper
      speed={3000}
      parallax
      modules={[Parallax]}
      simulateTouch={false}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="size-full relative"
    >
      <div
        slot="container-start"
        className="parallax-bg grayscale-50 opacity-50"
        style={{
          'background-image': `url(${backgroundImage})`,
        }}
        data-swiper-parallax="-23%"
      />
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="size-full flex flex-col 2xl:flex-row 2xl:items-center justify-center font-light text-center md:text-left text-balance bg-gradient-to-t from-black from-10% py-10 md:px-16">
            <h1 className="2xl:w-[850px] text-4xl md:text-8xl" data-swiper-parallax="-300">{slide.title}</h1>
            <p className="md:w-[850px] md:text-4xl mt-4 2xl:mt-0" data-swiper-parallax="-100">{slide.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

HeroCarousel.propTypes = {
  slidesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  backgroundImage: PropTypes.string,
};

HeroCarousel.defaultProps = {
  backgroundImage: '',
};

export default HeroCarousel;
