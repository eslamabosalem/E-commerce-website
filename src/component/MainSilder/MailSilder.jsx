import React, { useEffect, useState } from 'react'
import logo from "../../assets/slider-image-3.jpg"
import logo4 from "../../assets/slider-2.jpg"
import logo5 from "../../assets/slider-image-2.jpg"
import logo2 from "../../assets/slider-2.jpg"
import logo3 from "../../assets/ad-banner-2.jpg"
import Slider from "react-slick";

export default function MailSilder() {


    var settings = {
        dots: false,
        infinite: true,
        speed: 1700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        arrows:false
      
      };
    
    
    
  return (
    <>
    <div className="grid grid-cols-12 mb-4 py-4 mt-6">
   
       
        <Slider {...settings} className='col-span-12 md:col-span-8'>
        <img  src={logo} alt="" className='w-full h-[400px]' />
        <img  src={logo4} alt="" className='w-full h-[400px]' />
        <img  src={logo5} alt="" className='w-full h-[400px]' />
    </Slider>
          
       
        <div className="col-span-12 md:col-span-4  ">
            <img height={200} src={logo2} alt="" className='w-full h-[200px]' />
            <img height={200} src={logo3} alt=""className='w-full h-[200px]' />
        </div>
    </div>
    
    
    
    
    </>
  )
}
