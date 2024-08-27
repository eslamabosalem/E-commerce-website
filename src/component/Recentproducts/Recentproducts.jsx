import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RingLoader } from "react-spinners";
import { CartContext } from '../../Context/Cartcountext';
import toast from 'react-hot-toast';
import { Wishlistt } from '../../ContextWishlist/WishlistCon';

export default function Recentproducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [Loading, setLoading] = useState(false);
  const [currentProductId, setcurrentProductId] = useState(0);

  const { AddproductWhish, deletWhishlist, wlIds, setWlIds } = useContext(Wishlistt);
  const { addProductToCart, setCartt } = useContext(CartContext);

  // استرجاع عدد المنتجات من localStorage عند تحميل الصفحة
  useEffect(() => {
    const numOfCartItems = localStorage.getItem('cartItems');
    if (numOfCartItems) {
      setCartt(Number(numOfCartItems));
    }
  }, [setCartt]);

  async function addProduct(productId) {
    setcurrentProductId(productId);
    setLoading(true);
    let response = await addProductToCart(productId);
    setcurrentProductId(productId);
    setLoading(false);

    if (response.data.status === "success") {
      const numOfCartItems = response?.data?.numOfCartItems;
      setCartt(numOfCartItems);
      localStorage.setItem('cartItems', numOfCartItems); // تخزين العدد في localStorage
      toast.success(response?.data?.message, {
        duration: 1000,
        position: "bottom-left"
      });
    } else {
      toast.error(response?.data?.message, {
        duration: 1000,
        position: "bottom-left"
      });
    }
  }

  function getRecent() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, error, isError, data, isSuccess } = useQuery({
    queryKey: ["recentproducts"],
    queryFn: getRecent,
    staleTime: 1000,
  });

  if (isLoading) {
    return (
      <div className="py-8 text-center w-full flex justify-center">
        <RingLoader color='green' />
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <div className="py-8 text-center w-full flex justify-center">
          <RingLoader color='green' />
        </div>
        <h3>{error.message}</h3>
      </>
    );
  }

  async function deleteItemFromWishlist(productId) {
    const response = await deletWhishlist(productId);
  }

  async function addWishList(productId) {
    const response = await AddproductWhish(productId);
    if (response.data.status === "success") {
      toast.success(response?.data?.message, {
        duration: 1000,
        position: "bottom-left"
      });
    } else {
      toast.error(response?.data?.message, {
        duration: 1000,
        position: "bottom-left"
      });
    }
  }

  if (isSuccess) {
    let filteredProducts = data.data.data.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    function handleSearchChange(e) {
      setSearchQuery(e.target.value);
    }

    return (
      <>
        <form className="w-11/12 mx-auto mt-28">
          <label htmlFor="default-search" className="mb-2 text-sm text-green-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              type="search"
              id="default-search"
              className="w-full p-4 ps-10 form-control border border-green-300 rounded-lg bg-green-50 focus:ring-blue-500 focus:border-green-500"
              placeholder="Search ..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 top-1 bg-green-500 hover:bg-green-700 active:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 transition-colors duration-300 ease-in-out"
            >
              Search
            </button>
          </div>
        </form>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="md:w-6/12 lg:w-4/12 xl:w-3/12">
                <div className="product relative categories my-5 py-5">
                  <div className="px-3">
                    <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                      <img className='w-full rounded-xl' src={product.imageCover} alt={product.title} />
                      <span className='block font-light text-green-600'>{product?.category?.name}</span>
                      <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className="flex justify-between mx-3">
                        <span>{product.price} EGP</span>
                        <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                      </div>
                    </Link>
                    <i
                      onClick={(e) => {
                        e.target.classList.contains('fa-regular')
                          ? addWishList(product.id).then(() => e.target.classList.replace('fa-regular', 'fa-solid'))
                          : deleteItemFromWishlist(product.id).then(() => e.target.classList.replace('fa-solid', 'fa-regular'))
                      }}
                      className={`${wlIds.includes(product.id) ? 'fa-solid' : 'fa-regular'} cursor-pointer fa-heart fa-2x absolute top-5 left-5 m-3 text-red-600`}
                    ></i>
                    <button onClick={() => addProduct(product.id)} className='btn'>
                      {currentProductId === product.id && Loading ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center w-full">
              <h3 className="text-gray-600">No products found</h3>
            </div>
          )}
        </div>
      </>
    );
  }
}
