import { useEffect, useState, useRef } from "react";
import css from "./MainSlider.module.css";
import {
  Navigation,
  Pagination,
  Mousewheel,
  A11y,
  Autoplay,
} from "swiper/modules";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Store/productSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainSlider() {
  const { records } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  // const [backgroundColor, setBackgroundColor] = useState("#EEE");

  const [mainSlidNum, setMainSlideNum] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const backG = useRef();

  useEffect(() => {}, [mainSlidNum]);

  const handleSlideChange = (swiper, e) => {
    const currentBgRef = backG.current;
    currentBgRef.style.clipPath = "circle(6.3% at 100% 0)";
    setTimeout(() => {
      currentBgRef.style.background = `linear-gradient(-120deg,#3130309a,${
        e.colors[swiper.activeIndex]
      })`;
      currentBgRef.style.clipPath = "circle(141.4% at 100% 0)";
    }, 500);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span  class="${className} ${css.polit}"> ${index + 1} </span>`;
    },
  };
  return (
    <Swiper
      className={css.main}
      style={{
        "--swiper-pagination-color": `white`,
      }}
      modules={[Autoplay, Navigation, Pagination, A11y]}
      spaceBetween={2}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setMainSlideNum(swiper.activeIndex)}
    >
      <div ref={backG} className={css.backgroundColor}></div>
      {records?.data?.slice(0, 3).map((product, index) => (
        <SwiperSlide key={index} className={css.mainDivS}>
          <div className={css.dataSlid}>
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <div>
            {product?.colors?.map((color,i) => (
              <span key={i} style={{backgroundColor:color}}> </span>
            ))}
            </div>
          </div>
          <Swiper
            className={css.secondeS}
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={pagination}
            modules={[Autoplay, Mousewheel, Pagination]}
            onSlideChange={(swiper) => handleSlideChange(swiper, product)}
          >
            {product?.images?.map((image, imgIndex) => (
              <SwiperSlide key={imgIndex} className={css.secondeDiv}>
                <img
                  style={{ width: "300px", rotate: "30deg" }}
                  src={image}
                  alt={`Slide ${index + 1} AAA ${imgIndex + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
