import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

export default function Carousel({ items }) {

  if (!items) {
    return null;
  }
  
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      key={'swiper'}
      slidesPerGroup={3}
      loop={true}
      loopFillGroupWithBlank={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {
        items?.map((item, index) => (
          <SwiperSlide key={ index }>
            { item }
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}