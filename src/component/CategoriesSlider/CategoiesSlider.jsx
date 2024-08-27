import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategoriesSlider() {




  const [categories, setCategories] = useState([])
  function getCategories() {

    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")

      .then((response) => {
        setCategories(response?.data?.data)
        console.log(response?.data?.data);
      })
      .catch((error) => {
        setCategories(error?.response?.data?.data)
        console.log(error);

      })



  }

  useEffect(() => {
    getCategories()
  }, [])


  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          autoplay: true,
          dots: true

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <div className=" py-5 ">
        <h2 className='py-4 text-gray-800 text-xl font-medium'> shop Popular Cartegories</h2>
        <Slider {...settings}>
         
          {categories?.map((category) =>   <div  key={category._id} className=" catogeriesslider p-3 mx-5 my-3  "> <div className=" "  >
            <img className='h-[300px]  w-[700px]  rounded-xl ' src={category.image} alt={category.name} />
            <h3 className='font-light mt-2'>  {category.name} </h3>
            </div>
          </div>)}
        </Slider>

      </div>





    </>
  )
}
