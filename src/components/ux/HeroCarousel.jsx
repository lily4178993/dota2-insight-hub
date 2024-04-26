import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import { BannerHeroes4 } from '../../assets';

// Define a structure to hold the data for each slide
const slidesData = [
  {
    id: 1,
    title: 'Embark on Your Epic Quest',
    description:
      'Begin your journey through the vast landscapes of Dota 2. Here, heroes await to claim their glory. Discover your champion and forge your path to victory.',
    image: BannerHeroes4,
  },
  {
    id: 2,
    title: 'Enter the Battlefield',
    description:
      'Step into a realm where strategy and skill collide. With heroes from every corner of the cosmos, find the one who resonates with your battle cry.',
    image: BannerHeroes4,
  },
  {
    id: 3,
    title: 'Legends Await Your Call',
    description:
      'Every hero has a tale, and every tale needs a hero. Dive into the rich lore of Dota 2 and emerge as the legend you\'re destined to become.',
    image: BannerHeroes4,
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
  return (
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      speed={600}
      parallax
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper size-full relative"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        style={{
          'background-image': `url(${BannerHeroes4})`,
        }}
        data-swiper-parallax="-23%"
      />
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="title" data-swiper-parallax="-300">
            Slide 1
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroCarousel;
