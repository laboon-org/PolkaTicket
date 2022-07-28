import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import categories from '../../data/categories';

import './CategorySlider.css'

const CategorySlider = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleClick = (category: string) :void => {
    setActiveCategory(category);
    //TODO: Change ticket lists
  }
  return (
    <div id="category-slider-wrap">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={15}
      >
        {/* Button: All */}
        <SwiperSlide 
          className={`category-btn ${activeCategory === "All" ? 'active' : ''}`} 
          onClick={() => handleClick('All')}
        >
          All
        </SwiperSlide>
        {/* Buttons: Categories */}
        {categories.map(category => (
          <SwiperSlide key={category.id} 
            className={`category-btn ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => handleClick(category.name)}
          >
            {category.name}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CategorySlider