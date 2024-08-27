import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Categories() {


  const [categories , setCategories] = useState([])



 








  function getCategory(){
  
  axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  
  .then(({data})=>{
  
    setCategories(data.data)
    console.log(data.data);
  })
  .catch((api)=>{
  
  console.log(api);
  
  })
}
useEffect(()=>{
  getCategory();
},[])
  







  return (
   <>

 
<div className=" container">
 <h1 className=' text-green-500 text-2xl font-bold py-2 text-center'> shop Popular Cartegories</h1>

<div className="row ">

{categories.map((category)=>  <div  key={category._id} className="  md:w-6/12 lg:w-4/12 xl:w-3/12 catogeries  m-auto my-3 py-2   px-2 catogeries "  >
 <img src={category.image} alt={category.name} className='catogory-img  w-[300px] m-auto h-[300px] bord rounded-lg '  />
<h2 className=' text-center text-green-500 font-bold fa-xl my-3 py-2'>{category.name}</h2>

</div> )}
</div>
</div>





   </>
  )
}
