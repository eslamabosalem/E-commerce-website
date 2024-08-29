
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'

import { useParams } from 'react-router-dom'
import * as Yup  from "yup"
import { UserContext } from '../../UserContext/UserContext'
import { CartContext } from '../../Context/Cartcountext'


export default function Payment() {
let {checkoutPatment}= useContext(CartContext)



    let validationSchema=Yup.object().shape({


        details: Yup.string().matches(/^[\w-]{3,}$/,"enter valid detalies").required("Name is Required"),
        city:Yup.string().matches(/^[\w-]{3,}$/,"enter valid city").required("city is required"),
        phone:Yup.string().matches(/^01[1250][0-9]{8}$/,"phone must start be valid number").required("phone is required ")
      
      
      })


 let data=useParams()
let formik= useFormik({
    initialValues:{
       details:"",
       phone:"",
       city:""




      
    },
    onSubmit:creatCashOrder,
   validationSchema
})
 
async function creatCashOrder(values){

    let res =await checkoutPatment( data.id,values)
if ( res.data.status=="success"){
    // res.data.session.url
    window.open(res.data.session.url,"_self")
}
    console.log(res ,"ok");
    
    
    
    }






  return (
    <>
    <div className=" containe m-auto py-24 ">


    <form className="max-w-lg py-9 mx-auto" onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl font-bold mb-6 text-green-600'>payment</h2>



        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-black dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details</label>
        </div>


        {formik.errors.details && formik.touched.details ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.details}
        </div> : null}




        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tal" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-black dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
        </div>


        {formik.errors.phone && formik.touched.phone ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="tal" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-black dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
        </div>


        {formik.errors.city && formik.touched.city ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.city}
        </div> : null}











          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">  CaseOrder</button>




      </form>


    </div>
    
    
    
    
    
    
    
    </>
  )
}
