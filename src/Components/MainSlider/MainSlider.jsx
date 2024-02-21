import React from 'react';
import styles from './MainSlider.module.css';
import img1 from '../../Assets/images/slider-image-1.jpeg';
import slide2 from '../../Assets/images/slider-image-2.jpeg';
import slide3 from '../../Assets/images/slider-image-3.jpeg';
import img2 from '../../Assets/images/grocery-banner-2.jpeg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return <>

  <div className="row my-5 g-0">

    <div className="col-md-9">
    <Slider {...settings}>
          
            <img className='w-100'  src={slide3} alt="slide" />
            <img className='w-100' src={slide2} alt="slide" />
          
        </Slider>
    </div>

    <div className="col-md-3">
      <img className='w-100' src={img1} height={250} alt="img" />
      <img className='w-100' src={img2} height={290} alt="img" />
    </div>

  </div>  
    
  </>
}
