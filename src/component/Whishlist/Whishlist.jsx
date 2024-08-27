import React, { useContext, useEffect, useState } from 'react';
import { Wishlistt } from '../../ContextWishlist/WishlistCon';
import { CartContext } from '../../Context/Cartcountext';
import toast from 'react-hot-toast';

export default function Whishlist() {
  const { wishList, setWlIds, getWishlist, deletWhishlist } = useContext(Wishlistt);
  const [loading, setLoading] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Function to delete an item from the wishlist
  async function deletwhish(productId) {
    setLoading(true);
    try {
      const response = await deletWhishlist(productId);
      // Remove the product from the wishlist
      if (response?.data?.data) {
        setWlIds((prevIds) => prevIds.filter((id) => id !== productId));
        toast.success('Product removed from wishlist');
      } else {
        toast.error('Failed to remove product from wishlist');
      }
    } catch (error) {
      toast.error('Error occurred while removing product from wishlist');
    } finally {
      setLoading(false);
    }
  }

  // Function to add a product to the cart
  async function addwhishlist(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error('Error occurred while adding product to cart');
    } finally {
      setLoading(false);
      setCurrentProductId(null);
    }
  }

  // Fetch the wishlist items when the component mounts
  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  return (
    <>
      <div className="container">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-3/4 mx-auto my-9 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <h2 className="text-3xl text-center text-green-600 py-5">My Wishlist</h2>
                </th>
              </tr>
            </thead>
          </table>

          {wishList?.map((product) => (
            <div
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-between text-center items-center"
            >
              <div className="p-4">
                <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
              </div>
              <div className="left-60">
                <span className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </span>
                <h3 className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} Egp
                </h3>
                <h4 className="px-6 py-4">
                  <span
                    onClick={() => deletwhish(product.id)}
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    {loading && currentProductId === product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      'Remove'
                    )}
                  </span>
                </h4>
              </div>

              <div className="">
                <button
                  onClick={() => addwhishlist(product.id) .then(deletwhish(product.id))}
                  className="outline-lime-300 mr-4 border-2 p-2 border-y-lime-400"
                >
                  {loading && currentProductId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}