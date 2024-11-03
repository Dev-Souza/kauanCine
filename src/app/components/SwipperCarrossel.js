import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Container } from 'react-bootstrap';

export default () => {
  return (
    <Container>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0} 
      slidesPerView={1} 
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }} 
      loop={true}
      style={{ width: '100%', height: '550px', maxWidth: 1100 }}
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
    </Container>
  );
};
