import axios from "axios";
import { createContext, useState } from "react";
import { UserContext } from "../UserContext/UserContext";

 export let  CartContext= createContext()
 

 export default function cartContextProvider(props){
   const [cartt, setCartt] = useState(null)
 let headers={
        token:localStorage.getItem("usertoken")
    }
function  getLoggedUserCard(){
 
 return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
headers
})
.then((response)=> {
   setCartt(response?.data?.numOfCartItems);
   return response
}
)


.catch((error)=>

 error
)}

function addProductToCart(productId){
 return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{ 
    productId:productId 
 },{
    headers
 })
 .then((response)=>{
   setCartt(response?.data?.numOfCartItems);
   return response
 }
 )
 .catch((error)=> error
 )

}
function deletProductItem(productId){
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ 
   
 headers
 })
 .then((response)=>{
   setCartt(response?.data?.numOfCartItems);
   return response
 }

 )
 .catch((error)=> error
 )

}
function updateCArtitemCount(productId,count){
 return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ 
    count:count
 },{

    headers
 })
 .then((response)=>{
   setCartt(response?.data?.numOfCartItems);
   return response
 }
 
 )
 .catch((error)=> error
 )

}



function checkoutPatment(id ,data){
let  options ={
   headers:{
      token:localStorage.getItem("usertoken")
   }
}

let body={
 
   shippingAddress:data
}


return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,body,options)


}










return(
    <>
 
    <CartContext.Provider value={{ checkoutPatment, getLoggedUserCard,addProductToCart,deletProductItem,updateCArtitemCount, cartt, setCartt}}>
        {props.children}
    </CartContext.Provider>
    
    
    
    </>
)







}

