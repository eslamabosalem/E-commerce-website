import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext/UserContext';
import logo from "../../assets/logo.svg";
import { CartContext } from '../../Context/Cartcountext';
// import { Wishlistt } from '../../ContextWishlist/WishlistCon';

export default function Navbar() {
  const { Userlogin, setUserLogin } = useContext(UserContext);
  // const { cart } = useContext(Wishlistt);
  const { cartt } = useContext(CartContext);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="bg-white border-gray-200 fixed top-0 left-0 right-0 z-40 rounded">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between ">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-40 h-auto me-5 " />
        </Link>

        {/* Toggle button for mobile view */}
        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isNavOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navbar links and icons */}
        <div className={`w-full xl:flex ${isNavOpen ? 'flex' : 'hidden'} flex-col xl:flex-row xl:items-center xl:justify-between p-4 xl:p-0 mt-4 border border-gray-100 rounded-xl bg-gray-50 xl:flex-nowrap xl:mt-0 xl:border-0 xl:bg-white`} id="navbar-default">
          <ul className="font-medium flex flex-col xl:flex-row xl:space-x-8 items-center">
            {Userlogin ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/whishlist"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Whishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Brands
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Social icons and cart/wishlist icons */}
          <div className="flex space-x-4 items-center my-4">
            {Userlogin && (
              <span
                onClick={logout}
                className="cursor-pointer text-gray-900 hover:text-green-700"
              >
                SignOut
              </span>
            )}
            <li className="relative flex items-center">
              <div className="absolute -top-2 -right-3 text-white z-10 rounded-xl bg-green-500 px-2 text-xs">{cartt}</div>
              <i className="text-2xl fa-solid fa-cart-shopping"></i>
            </li>
            {/* <li className="relative flex items-center">
              <div className="absolute -top-2 -right-3 text-white z-10 rounded-xl bg-green-500 px-2 text-xs">{cart}</div>
              <i className="text-2xl fa-solid fa-heart text-red-600"></i>
            </li> */}
            <li className="flex space-x-2 ">
              <a href="#" className="text-gray-900 hover:text-green-700">
                <i className="fa-brands fa-facebook mx-1 text-xl"></i>
              </a>
              <a href="#" className="text-gray-900 hover:text-green-700">
                <i className="fa-brands fa-twitter mx-1  text-xl"></i>
              </a>
              <a href="#" className="text-gray-900 hover:text-green-700">
                <i className="fa-brands fa-youtube mx-1  text-xl"></i>
              </a>
              <a href="#" className="text-gray-900 hover:text-green-700">
                <i className="fa-brands fa-tiktok mx-1  text-xl"></i>
              </a>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}
