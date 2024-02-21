import React from 'react';
import styles from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  function getCategorySlider() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')  
  }

  let {isError , isLoading , data} = useQuery('getCategorySlider' , getCategorySlider);

  console.log(data?.data.data);

   
  return <>

   {data?.data.data?<Slider {...settings}>
    
      {data?.data.data.map((category)=> <img className='w-100' height={200} key={category._id} src={category.image} alt="" /> )}

   </Slider>:" " }

      
    
    
  </>
}
