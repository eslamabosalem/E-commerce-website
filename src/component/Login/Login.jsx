import React, { useContext } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import * as Yup from "yup"
import { UserContext } from '../../UserContext/UserContext';


export default function login() {
  let { setUserLogin } = useContext(UserContext)
  const [apiError, setApiError] = useState("")
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();



  function handleRegisteer(formvales) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formvales)

      // if (data.message==="success"){

      //   navigate("/")
      // }

      .then((response) => {
        //  انا عملت هنا علشان كدة فى رد فالازم يتلغى 
        setLoading(false)
        if (response.data.message === "success") {

          localStorage.setItem("userToken", response.data.message)
          setUserLogin(response.data.message)

          console.log("ok");
          navigate("/")
          console.log(response.data.message);

        }

        ;
      })
      .catch((apiresponse) => {
        setLoading(false)
        //  use state
        setApiError(apiresponse?.response?.data?.message)

        console.log("no");
      })





  }






  // function myValidation (value){

  // let errors={}
  // //  ! value.name
  // if (value.name===""){

  // errors.name="Name is Required"

  // }else if( /^[A-z][a-z]{3,5}$/.test(value.name)) {


  // errors.name="Name must start with Uppercase then"


  // }
  // if (!value.email){
  // errors.email="email is Required"



  // }
  // else if (/^{[a-z]$/ .test(value.email)){
  // errors.email="Email must start "

  // }
  // if (!value.password){
  //   errors.password=""
  // }else if(/^{[a-z]$/ .test(value.password)){
  //   errors.password=""
  // }

  // return errors


  // }





  let formikYup = Yup.object().shape({


    email: Yup.string().email("Emil is invalid").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start be valid number").required("password is Required"),


  })


  let formik = useFormik({

    initialValues: {


      email: "",
      password: "",



    },
    // اة لما الفورم يتبعتلها submit بتنادى على function
    // validate:myValidation,
    validationSchema: formikYup,
    onSubmit: handleRegisteer


  })











  return (

    <>
     <div className="container">
      {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div> : null}



      <form className="max-w-lg py-9 mx-auto" onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl font-bold mb-6 text-green-600'>login Now</h2>



        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-black dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
        </div>


        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div> : null}






        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-black dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password</label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div> : null}








        <div className="  flex  items-center pl-4">
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">  {loading ? <i className='fas fa-spinner fa-spin'></i> : "Submit"}</button>

          <p className='mx-1'>did,t have account yet ?<Link to="/Register"> <span className='font-semibold'>Register Now</span> </Link></p>
          
          <Link to="/forgotPassword" className= "  text-green-500 hover:underline">Forgot Password?</Link>


        </div>



      </form>


      </div>










    </>
  )
}
