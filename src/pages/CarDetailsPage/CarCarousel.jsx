import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function CarCarousel({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="max-w-sm md:max-w-3xl h-full  overflow-hidden mx-auto pt-2 w-full px-4 ">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className=" h-full"
      >
        {images?.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img
                className={`${
                  images
                    ? "h-full w-full   block object-cover "
                    : "h-full w-full bg-gray-200 animate-pulse "
                }`}
                src={`${import.meta.env.VITE_IMAGE_URL}/images/${image}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="Swiper"
      >
        {images?.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img
                className="h-full w-full block object-cover rounded-full"
                src={`${import.meta.env.VITE_IMAGE_URL}/images/${image}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
