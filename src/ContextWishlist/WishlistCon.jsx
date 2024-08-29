import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export let Wishlistt = createContext()
export default function WishListProvider(props) {
//    const [cart, setCart] = useState(null)
   const [wlIds, setWlIds] = useState([])
const [wishList, setWishList] = useState([])

let headers={
   token:localStorage.getItem("usertoken")

}


function getWishlist(){
    
 return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers
})
.then((response)=>{
    
    console.log('get',response);
    
    // setCart(response?.data?.count)
    setWishList(response?.data?.data)
    setWlIds(response?.data?.data?.map((wl)=>wl._id))
    setWishList(response?.data?.data)

}
)
.catch((error)=>
    error
)


}

function AddproductWhish(whishId){

 return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist/`,{

 productId:whishId

},{

headers

}) 
.then(async(response)=>{
    if(response.data.message == 'success'){
        // setCart(response?.data?.count)
        setWlIds(response?.data?.data)
        setWishList(response?.data?.data)
        await getWishlist();
    }
console.log(response)
return response
}
)
.catch((error)=>{
    return error
   }
)





}


function deletWhishlist(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{ 
      
    headers
    })
    .then(async(response)=>{
        if(response.data.message == 'success'){
            // setCart(response?.data?.count)
            setWlIds(response?.data?.data)
            setWishList(response?.data?.data)

            await getWishlist();
        }
    console.log(response)
    return response
    }
    )
    .catch((error)=>{
        return error
       }
    )
    }    

 


  return (
 <>
 
 
<Wishlistt.Provider value={{getWishlist,AddproductWhish,deletWhishlist , wlIds,
setWlIds, setWishList,wishList}}>
{props.children}
</Wishlistt.Provider>
 
 
 
 </>
  )
}
