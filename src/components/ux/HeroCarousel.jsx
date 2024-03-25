import React from 'react';
import Slider from 'react-slick';
import {
  BannerHeroes1,
  BannerHeroes2,
  BannerHeroes3,
  BannerHeroes4,
} from '../../assets';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define a structure to hold the data for each slide
const slidesData = [
  {
    id: 1,
    title: 'Embark on Your Epic Quest',
    description:
      'Begin your journey through the vast landscapes of Dota 2. Here, heroes await to claim their glory. Discover your champion and forge your path to victory.',
    image: BannerHeroes1,
  },
  {
    id: 2,
    title: 'Enter the Battlefield',
    description:
      'Step into a realm where strategy and skill collide. With heroes from every corner of the cosmos, find the one who resonates with your battle cry.',
    image: BannerHeroes2,
  },
  {
    id: 3,
    title: 'Legends Await Your Call',
    description:
      'Every hero has a tale, and every tale needs a hero. Dive into the rich lore of Dota 2 and emerge as the legend you\'re destined to become.',
    image: BannerHeroes3,
  },
  {
    id: 4,
    title: 'Forge Your Legacy',
    description:
      'The ancients call for a hero; will you answer? Explore the myriad of champions and unleash your potential on the battlegrounds of Dota 2.',
    image: BannerHeroes4,
  },
];

function HeroCarousel() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
  };

  return (
    <div className="slider-container">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div key={slide.id} className="relative min-h-screen mb-32 sm:mb-0 sm:h-screen">
            <div className="absolute w-full h-full bg-gradient-to-b from-black/50 to-black" />
            <div className="absolute w-full h-full md:w-3/4 lg:w-full lg:top-2/4 top-1/4 left-2/4 -translate-x-2/4 lg:left-0 lg:translate-x-0 lg:-translate-y-1/4 px-4 lg:text-left text-balance text-center grid grid-cols-1 lg:grid-cols-3 place-content-start">
              <h1 className="max-w-xl text-5xl md:text-6xl font-semibold mb-4 lg:col-span-2">
                {slide.title}
              </h1>
              <p className="max-w-xl text-2xl md:text-3xl lg:col-span-2">
                {slide.description}
              </p>
              <button
                type="button"
                title="Explore"
                aria-label="Explore"
                onClick={() => document.getElementById('explore-heroes').scrollIntoView()}
                className="w-40 h-40 flex items-center lg:absolute lg:top-8 lg:right-2/4 justify-center mx-auto mt-10 md:mt-20 lg:mt-0 uppercase border-8 border-double border-white rounded-full text-3xl text-white bg-white/20 hover:scale-95 hover:bg-white/30 focus:scale-95 focus:bg-white/30 transition-transform lg:col-end-4 lg:col-span-1"
              >
                Explore
              </button>
            </div>
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-top object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroCarousel;
