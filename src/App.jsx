import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Home/Home'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Cart from './component/Cart/Cart'
import Products from './component/Products/Products'
import Brands from './component/Brands/Brands'
import Categories from './component/Categories/Categories'
import Login from './component/Login/Login'
import Layout from './component/Layout/Layout'
import Register from './component/Register/Register'
import CounterContextProvider from './Context/Context'
import UserContextProvider from './UserContext/UserContext'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Recentproducts from './component/Recentproducts/Recentproducts'
import ProductDetails from './component/Product.Details/ProductDetails'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextprovider from './Context/Cartcountext'
 import {Toaster}from"react-hot-toast"
import Payment from './component/Payment/Payment'
import Whishlist from './component/Whishlist/Whishlist'
import WishListProvider from './ContextWishlist/WishlistCon'
import Seach from './component/Seach/Seach'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'
import ResetPassword from './component/ResetPassword/ResetPassword'
import VerifyCode from './component/VerifyCode/VerifyCode'
import NotFound from './Context/Notfound/NotFound'
import allorders from './component/Allorders/allorders'
import Allorders from './component/Allorders/allorders'



let query= new QueryClient();
function App() {
  
let createBrowser=createBrowserRouter ([

{path:"" ,element:<Layout/>, children:[
  {index:true,element: <ProtectedRoute><Home/></ProtectedRoute>},
{path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
{path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:"Whishlist",element:<ProtectedRoute><Whishlist/></ProtectedRoute>},
{path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
{path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
{path:"payment/:id",element:<ProtectedRoute><Payment/></ProtectedRoute>},
{path:"productDetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
{path:"Register",element:<Register/>},
{path:"forgotPassword",element:<ForgotPassword/>},
{path:"resetPassword",element:<ResetPassword/>},
{path:"verifyCode",element:<VerifyCode/>},
{path:"*",element:<NotFound/>},
{path:"allorders",element:<ProtectedRoute><Allorders/></ProtectedRoute>},


{path:"login",element:<Login/>},
{path:"seach",element:<Seach/>},
]},

])









  return (
    <>
 
    <QueryClientProvider client={query}><UserContextProvider>  
        <CounterContextProvider>
          <CartContextprovider>  
              <WishListProvider>
       <ReactQueryDevtools initialIsOpen="false"/>
       <Toaster></Toaster>

       
        <RouterProvider router={createBrowser}></RouterProvider>
        </WishListProvider>
        </CartContextprovider>
        </CounterContextProvider>
</UserContextProvider>
</QueryClientProvider>

 



  
    </>
  )
}

export default App

