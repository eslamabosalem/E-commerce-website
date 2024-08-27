import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {RingLoader} from "react-spinners"
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/Cartcountext'
import toast from 'react-hot-toast'
import { Wishlistt } from '../../ContextWishlist/WishlistCon'

export default function Products() {
  let {AddproductWhish ,deletWhishlist , wlIds, setWlIds ,setCart}=useContext(Wishlistt);

  const [searchQuery, setSearchQuery] = useState('');
  let filteredProducts=[];
  const [Loading, setLoading] = useState(false)
  const [currentProductId, setcurrentProductId] = useState(0)
  let{addProductToCart}=useContext(CartContext);
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
 }

 
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

   
 
let{data, error,isError,isLoading,isFetched,isSuccess}=useProducts();


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
    
    if(isSuccess){
      filteredProducts=data.data.data.filter(p=>p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      function handleSearchChange(e){
        setSearchQuery(e.target.value);
      }
    
    
    
    
    
    
      return (
      <>
  <div className="container">

     <form className="w-11/12 mx-auto mt-28  ">   
    <label htmlFor="default-search" className="mb-2   text-sm  font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0  flex items-center ps-3 pointer-events-none">
        
      </div>
      <input value={searchQuery} onChange={handleSearchChange} type="search"  id="default-search" className="block w-full p-4 ps-10 text-wm  form-control border border-green-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-green-500 " placeholder="Search ..." required />
      <button type="submit" className="text-white  absolute end-2.5 top-1 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-1.5  ">Search</button>
    </div>
  </form>
  

      <div className="row  ">
        
        {filteredProducts.map((product)=>   <div key={product.id} className=" md:w-6/12 lg:w-4/12 xl:w-3/12 ">
    
          <div className="product relative catogeries my-5 py-5 ">
            <div className="px-3">
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
          <img className='w-full rounded-xl' src={product.imageCover} alt={product.title}  />
          <span className='block font-light text-green-600'>{product.category.name}</span>
    <h3 className="text-lg font-normal  text-gray-800 mb-4">{product.title.split(" ").slice(0,2).join(" ")}</h3>

    <div className="flex justify-between  ">
    <span>
        {product.price} EGP
    </span>

    <span> {product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
    
    </div>
    
    
    </Link>
    <i  onClick={(e)=>{
  
  e.target.classList.contains('fa-regular')? addWishList(product?.id).then(()=>e.target.classList.replace('fa-regular' , 'fa-solid'))  :
    deleteItemFromWishlist(product?.id).then(()=>e.target.classList.replace('fa-solid' , 'fa-regular'))
   
  
  }} className={`${wlIds.includes(product?.id)  ? 'fa-solid' : 'fa-regular'} cursor-pointer  fa-heart fa-2x  absolute top-5  left-5 m-3 text-red-600`}>

</i>
    <button onClick={()=>addProduct(product.id)} className='btn  '>
  {product.id &&Loading?<i className="fas fa-spinner fa-spin"></i>: "add to cart"}
  
  </button>
       </div>
       </div>
        </div>
    )}
     
    
      </div>
      
      
      </div>
      
      </>
      )




      }





  
}
