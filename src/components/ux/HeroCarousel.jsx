import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

/**
 * Renders a hero carousel component.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.slidesData - The data for the carousel slides.
 * @param {string} props.carouselImage - The URL of the carousel background image.
 * @param {Array|string} props.sliderModule - The modules to enable for the carousel.
 * @param {number} props.sliderSpeed - The speed of the carousel slide transition.
 * @param {string} props.sliderEffect - The effect to apply to the carousel slides.
 * @returns {JSX.Element} The rendered hero carousel component.
 */
function HeroCarousel({
  slidesData, carouselImage, sliderModule, sliderSpeed, sliderEffect,
}) {
  const isSliderModuleArray = Array.isArray(sliderModule);

  return (
    <Swiper
      effect={sliderEffect || 'fade'}
      fadeEffect={{ crossFade: true }}
      modules={isSliderModuleArray ? sliderModule : undefined}
      speed={sliderSpeed || 1000}
      loop
      simulateTouch={false}
      autoplay={{
        disableOnInteraction: false,
      }}
      className="relative size-full"
    >
      <div
        slot="container-start"
        className={`opacity-50 parallax-bg grayscale-50 ${isSliderModuleArray && sliderModule.includes('Parallax') ? 'data-swiper-parallax="-23%"' : ''}`}
        style={{
          backgroundImage: `url(${carouselImage})`,
        }}
      />
      {slidesData.map((slide) => (
        <SwiperSlide
          key={slide.id}
          style={{
            background: `url(${slide?.image}) no-repeat top/cover, #0000008c`,
            backgroundBlendMode: 'multiply',
            isolation: 'isolate',
          }}
        >
          <div className="size-full flex flex-col 2xl:flex-row 2xl:items-center justify-center font-light text-center md:text-left text-balance bg-gradient-to-t from-black from-10% py-10 md:px-16">
            <h1 className={`2xl:w-[850px] text-4xl md:text-7xl ${isSliderModuleArray && sliderModule.includes('Parallax') ? 'data-swiper-parallax="-300"' : ''}`}>{slide.title}</h1>
            <p className={`md:w-[850px] md:text-4xl mt-4 2xl:mt-0 ${isSliderModuleArray && sliderModule.includes('Parallax') ? 'data-swiper-parallax="-200"' : ''}`}>{slide.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

HeroCarousel.propTypes = {
  slidesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  carouselImage: PropTypes.string,
  sliderModule: PropTypes.arrayOf(PropTypes.func),
  sliderEffect: PropTypes.string,
  sliderSpeed: PropTypes.number,
};

HeroCarousel.defaultProps = {
  carouselImage: '',
  sliderModule: [],
  sliderEffect: 'fade',
  sliderSpeed: 1000,
};

export default HeroCarousel;
