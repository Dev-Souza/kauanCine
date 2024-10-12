// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0} // Remove o espaço entre os slides
      slidesPerView={1} // Um slide por vez, preenchendo 100% do contêiner
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay configurado
      loop={true} // Loop ativado
      style={{ width: '100%', height: '550px' }}
    >
      <SwiperSlide>
        <img src='/assets/images/coringa2.jpg' alt='Coringa' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/assets/images/coringa2.jpg' alt='Coringa' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/assets/images/coringa2.jpg' alt='Coringa' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src='/assets/images/coringa2.jpg' alt='Coringa' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </SwiperSlide>
    </Swiper>
  );
};
