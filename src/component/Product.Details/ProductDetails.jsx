import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Products from '../Products/Products';
import Slider from "react-slick";
import { CartContext } from '../../Context/Cartcountext';
import {RingLoader} from "react-spinners"
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Wishlistt } from '../../ContextWishlist/WishlistCon'



export default function ProductDetails() {
  let {id,category}= useParams();
  let {AddproductWhish ,deletWhishlist , wlIds, setWlIds ,setCart}=useContext(Wishlistt);
  let [productDetalis, setProductDetalis] = useState(null);
  let [productcategory, setProductcategory] = useState([]);
  let{addProductToCart}=useContext(CartContext);
  const [Loading, setLoading] = useState(false)
  const [currentProductId, setcurrentProductId] = useState(0)
   async function addProduct(productId){
    setcurrentProductId(productId)
    setLoading(true)
    let response=  await addProductToCart(productId);
    setcurrentProductId(productId)
    setLoading(false)
    // tooster
    if (response.data.status==="success"){
      toast.success(response?.data?.message,{
  
  duration:1000,
  position:"botton-left"
  
      })
    }else{
      setLoading(false)
      toast.error(response?.data?.message,{
     
        duration:1000,
        position:"botton-left"
  
      })
    }
  
    console.log(response);
  }
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

//     علشان لما ادوس على الصور يطلعلى الصورة بكلام 
function  getProductDetails(id){
  setLoading(true)
 axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

.then(({data})=>{
  setLoading(false)
  setProductDetalis(data.data)
  console.log(data.data,"e")
 
})
.catch((erro)=>{
  setLoading(false)
  setProductDetalis(erro)
})


}



//  علشان يجبلى المنتجات الى شبة المنتج دة 
function  getProductcategory(category){
  setLoading(true)
axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
.then(({data})=>{
  setLoading(false)

let allProducts=data.data
let related=allProducts.filter((product)=>product.category.name==category)
setProductcategory(related)
   
  
})
.catch((erro)=>{
  setLoading(false)
console.log(erro);

})


}
useEffect(()=>{

  getProductDetails(id);
  getProductcategory(category)

},[ id,category])


async function deleteItemFromWishlist(productId){
  
  const response = await deletWhishlist(productId)
  console.log(response);
  
}



async function addWishList(productId){

  const response = await AddproductWhish(productId)

  if (response.data.status==="success"){
    
    console.log(response.data,"eslam");
    
   
    toast.success(response?.data?.message,{

duration:1000,
position:"botton-left"

    })
  }else{
    setLoading(false)
    toast.error(response?.data?.message,{
   
      duration:1000,
      position:"botton-left"

    })
  }

 
  console.log(response);
  
}

    

function getRecent(){

  return axios.get("https://ecommerce.routemisr.com/api/v1/products")
}

let {isLoading,error,isError, data,isFetched}=useQuery({
  queryKey:["recentproducts"],
  queryFn:getRecent,
  staleTime:1000,

})


if (isLoading){

return (
<>
<div className=" py-8 text-center w-full flex justify-center"><RingLoader color='green'></RingLoader></div>
</>
)
}
if (isError){


return (
<>
<div className=" py-8 text-center w-full flex justify-center"><RingLoader color='green'></RingLoader></div>
<h3>{error}</h3>

</>
)




}



  return (
 
<>
<div className=" container">
<div className="row ">

<div className=" md:w-1/4 sm:w-2/4 lg:3/4  " >
<Slider {...settings}>
      {productDetalis?.images?.map((src)=>  <  img className='w-full ' key={src.id} src={src} alt={productDetalis?.title} />
 )}

    </Slider>

</div>

<div className="w-3/4 p-6  ">
<div className="relative flex  bottom-12 text-centeritems-center">
<i  onClick={(e)=>{
  
  e.target.classList.contains('fa-regular')? addWishList(productDetalis?.id).then(()=>e.target.classList.replace('fa-regular' , 'fa-solid'))  :
    deleteItemFromWishlist(productDetalis?.id).then(()=>e.target.classList.replace('fa-solid' , 'fa-regular'))
   
  
  }} className={`${wlIds.includes(productDetalis?.id)  ? 'fa-solid' : 'fa-regular'} cursor-pointer  fa-heart fa-2x  absolute top-1  left-5 m-3 text-red-600`}>

</i>

</div>
<h1 className=' text-lg font-normal text-gray-950'>{productDetalis?.title}</h1>
<p className=' text-gray-600 font-light'>{productDetalis?.description}</p>


<div className="flex justify-between my-2 ">
<span>
    {productDetalis?.price} EGP  
</span>

<span className=''> {productDetalis?.ratingsAverage} <i className='fas fa-star text-yellow-400  '></i></span>

</div>
<button onClick={()=>addProduct(productDetalis.id)} className='btn  '>
  {currentProductId===productDetalis?.id&&Loading?<i className="fas fa-spinner fa-spin"></i>: "add to cart"}
  
  </button>
  

</div>





</div>

<div className="row">
{productcategory.map((product)=> <div key={product.id} className="md:w-6/12 px-3 lg:w-3/12 xl:w-2/12   ">
  <div className="product relative ">
        <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
      <img className='w-full' src={product.imageCover} alt={product.title}  />
      <span className='block font-light text-green-600'>{product.category.name}</span>
<h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(" ").slice(0,2).join(" ")}</h3>
    
<div className="flex justify-between  ">
<span>
    {product.price} EGP
</span>

<span> {product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>

</div>


</Link>
<button onClick={()=>addProduct(productDetalis.id)} className='btn  '>
  {currentProductId===productDetalis?.id&&Loading?<i className="fas fa-spinner fa-spin"></i>: "add to cart"}
  
  </button>
  <i  onClick={(e)=>{
  
  e.target.classList.contains('fa-regular')? addWishList(product.id).then(()=>e.target.classList.replace('fa-regular' , 'fa-solid'))  :
    deleteItemFromWishlist(product.id).then(()=>e.target.classList.replace('fa-solid' , 'fa-regular'))
   
  
  }} className={`${wlIds.includes(product.id)  ? 'fa-solid' : 'fa-regular'} cursor-pointer  fa-heart fa-2x  absolute top-1 left-5 m-3 text-red-600`}>

</i>


   </div>

</div> )}

</div>

</div>




















</>

  )
}
