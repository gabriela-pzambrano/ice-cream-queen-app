import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './carousel.css';
import postres from "../assets/postres.png";
import conos from "../assets/conos.png";
import paletas from "../assets/paletas.png";
import copas from "../assets/copas.png";
import milkShakes from "../assets/milk-shakes.png";
import granizados from "../assets/granizados.png";

const types = [
  {
    icon: conos,
    name: 'Conos',
    color: 'bg-[#FE7493]',
  },
  {
    icon: postres,
    name: 'postres',
    color: 'bg-[#FBB147]',
  },
  {
    icon: copas,
    name: 'copas',
    color: 'bg-secondary-500',
  },
  {
    icon: paletas,
    name: 'paletas',
    color: 'bg-primary-500',
  },
  {
    icon: milkShakes,
    name: 'Milk Shakes',
    color: 'bg-[#4FABF5]',
  },
  {
    icon: granizados,
    name: 'Granizados',
    color: 'bg-[#ef305d]',
  },
];

const Carousel = () => {

  SwiperCore.use([Autoplay]);
  return (
    <section className="mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:max-w-[65rem] xl:px-8">
      <Swiper
        slidesPerView={4}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={5}
        navigation
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {types.map((type, index) => (
          <SwiperSlide key={index}>
            <div className={`flex justify-center items-center ${type.color} py-2 px-2 capitalize font-bold rounded-3xl`}>
              <img src={type.icon} alt="icon-type-food" className='w-16' />
              <h1 className='text-white'>{type.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel;