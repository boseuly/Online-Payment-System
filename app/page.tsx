
"use client"
import Image from "next/image";
import MainHeader from '../components/common/MainHeader';
import '../styles/css/main.css'
import '../styles/css/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules"; 
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


export default function Home() {
  return (
    <>
    {/* header */}

    <MainHeader></MainHeader>

    
    {/* body */}
    <div className="main-body">
      <Swiper 
      className="main-swiper wd-100 hg-100"
      slidesPerView={1}
      effect={'fade'}
      modules={[Autoplay, EffectFade]}
      autoplay={{
        delay: 4000,       // 3초마다 자동 이동
        disableOnInteraction: false, // 유저가 터치해도 계속 자동
      }}
      speed={2000}   // ← 페이드 속도(1.5초)
      fadeEffect={{ crossFade: true }}
      loop={true}>
        <SwiperSlide>
          <div className="wd-100 hg-100">
            <a href="#">
              <span className="main-background-image-1"></span>
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="wd-100 hg-100">
            <a href="#">
              <span className="main-background-image-2"></span>
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>


    
    {/* footer */}

    </>
  );
}
