import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax } from 'swiper/modules';
import { BannerHeroes4 } from '../../assets';

// Define a structure to hold the data for each slide
const slidesData = [
  {
    id: 1,
    title: 'Embark on Your Epic Quest',
    description:
      'Begin your journey through the vast landscapes of Dota 2. Here, heroes await to claim their glory. Discover your champion and forge your path to victory.',
  },
  {
    id: 2,
    title: 'Enter the Battlefield',
    description:
      'Step into a realm where strategy and skill collide. With heroes from every corner of the cosmos, find the one who resonates with your battle cry.',
  },
  {
    id: 3,
    title: 'Legends Await Your Call',
    description:
      'Every hero has a tale, and every tale needs a hero. Dive into the rich lore of Dota 2 and emerge as the legend you\'re destined to become.',
  },
  {
    id: 4,
    title: 'Forge Your Legacy',
    description:
      'The ancients call for a hero, will you answer? Explore the myriad of champions and unleash your potential on the battlegrounds of Dota 2.',
  },
];

function HeroCarousel() {
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
          'background-image': `url(${BannerHeroes4})`,
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

export default HeroCarousel;
