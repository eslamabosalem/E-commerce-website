import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/Cartcountext';
import useProducts from '../../Hooks/useProducts';
import { RingLoader } from "react-spinners";
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartDetalies, setCartDetalies] = useState(null);

  const { getLoggedUserCard, updateCArtitemCount, deletProductItem } = useContext(CartContext);

  const getCartItem = async () => {
    let response = await getLoggedUserCard();
    setCartDetalies(response?.data?.data);
  };

  const updateCartCount = async (productId, count) => {
    let response = await updateCArtitemCount(productId, count);
    setCartDetalies(response?.data?.data);
  };

  const deletItem = async (productId) => {
    let response = await deletProductItem(productId);
    setCartDetalies(response?.data?.data);
  };

  useEffect(() => {
    getCartItem();
  }, []);

  const { data, error, isError, isLoading } = useProducts();

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

  return (
    <div className="container mx-auto p-4">
      <h2 className='text-2xl md:text-3xl text-center text-green-600 py-5'>Shopping Cart</h2>
      <h3 className='text-center text-slate-600 text-lg font-light mb-4'>
        Total Cart Price: {cartDetalies?.totalCartPrice} EGP
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr className="text-xs text-gray-700 uppercase">
              <th className="px-2 py-2 sm:px-4">Image</th>
              <th className="px-2 py-2 sm:px-4">Product</th>
              <th className="px-2 py-2 sm:px-4">Qty</th>
              <th className="px-2 py-2 sm:px-4">Price</th>
              <th className="px-2 py-2 sm:px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartDetalies?.products.map((product) => (
              <tr key={product.product.id} className="border-b bg-white hover:bg-gray-50">
                <td className="p-2 sm:p-4">
                  <img src={product.product.imageCover} className="w-16 sm:w-24 h-auto" alt={product.product.title} />
                </td>
                <td className="px-2 sm:px-4 py-2 font-semibold text-gray-900">
                  {product.product.title}
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateCartCount(product.product.id, product.count - 1)}
                      className="p-1 text-gray-500 border border-gray-300 rounded-full hover:bg-gray-100"
                      type="button"
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() => updateCartCount(product.product.id, product.count + 1)}
                      className="p-1 text-gray-500 border border-gray-300 rounded-full hover:bg-gray-100"
                      type="button"
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 font-semibold text-gray-900">
                  {product.price * product.count} EGP
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <span
                    onClick={() => deletItem(product.product.id)}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to={`/payment/${cartDetalies?._id}`}>
        <button className='my-2 rounded-xl bg-blue-500 text-white p-4 w-full  mx-auto block'>
          Pay Your Product
        </button>
      </Link>
    </div>
  );
}
