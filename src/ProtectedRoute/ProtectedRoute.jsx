import React, { useState } from 'react'
// دى component
import { Navigate } from 'react-router-dom';
useState

export default function ProtectedRoute(props) {


if (localStorage.getItem("userToken")!==null){

// Navigate to component
return props.children


}else{
// Navigate Login
return <Navigate  to={"/login"}></Navigate>


}





 
}
