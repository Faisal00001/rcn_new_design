import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const ProductDetailsSlider = ({ product }) => {
    console.log(product?.product_image)
    console.log(`http://127.0.0.1:8000/${product?.product_image}`)
    return (
        <div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {
                    product?.product_image.map((image, index) => <SwiperSlide key={index}>
                        <img src={`http://127.0.0.1:8000${image}`} />
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default ProductDetailsSlider;