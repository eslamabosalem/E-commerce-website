import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
 

    function getRecent(){

        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
      }
      
      let responseObject=useQuery({
        queryKey:["recentproducts"],
        queryFn:getRecent,
        staleTime:80000000,
        // retry:6,
        // retryDelay:1000,
        // refetchInterval:3000,
        // refetchIntervalInBackground:true
      
      });
    
  
    
    
    return (
        responseObject
    )
    
    
}
