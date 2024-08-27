import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { RingLoader } from "react-spinners";
import useProducts from '../../Hooks/useProducts'; // تأكد من وجود هذا الهوك أو استبدله بما يناسبك

const Brands = () => {
  const [brandsProduct, setBrandsProduct] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loadingBrand, setLoadingBrand] = useState(false); // حالة تحميل العلامة التجارية
  const modalRef = useRef(null); // مرجع للنافذة المنبثقة

  // Fetch brands data
  const getBrands = () => {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => {
        setBrandsProduct(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBrands();
  }, []);

  const { data, error, isError, isLoading } = useProducts();

  useEffect(() => {
    // إضافة مستمع للنقر في المستند
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedBrand(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // تنظيف المستمع عند فك التركيب
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

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

  // Handle brand click
  const handleBrandClick = (brand) => {
    setLoadingBrand(true); // تعيين حالة التحميل إلى true
    setSelectedBrand(brand);

    // محاكاة تحميل البيانات
    setTimeout(() => {
      setLoadingBrand(false); // تعيين حالة التحميل إلى false بعد انتهاء التحميل
    }, 2000); // تغيير الوقت حسب الحاجة
  };

  return (
    <div className="relative">
      {/* Brand Info Box */}
      {selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 border border-gray-200 rounded-lg shadow-lg">
          <div
            ref={modalRef}
            className="relative w-4/5 max-w-lg p-6 bg-white rounded-lg shadow-lg"
          >
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-lg"
            >
              Close
            </button>
            <div className="flex items-center">
              {loadingBrand ? (
                <RingLoader color='green' />
              ) : (
                <>
                  <img src={selectedBrand.image} alt={selectedBrand.name} className="w-24 h-24 object-cover rounded-full" />
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">{selectedBrand.name}</h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Brands List */}
      <div className="container mx-auto p-4 mt-20">
        <h1 className='text-green-500 font-bold mt-3 text-center text-2xl'>All Brands</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {brandsProduct.map((brand) => (
            <div
              key={brand._id}
              className="relative p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleBrandClick(brand)}
            >
              {loadingBrand && selectedBrand?._id === brand._id ? (
                <div className="flex justify-center items-center w-full h-40 mx-5">
                  <RingLoader color='green' />
                </div>
              ) : (
                <>
                  <img
                  
                    src={brand.image}
                    alt={brand.name}
                    className='w-full h-40 object-cover rounded-lg'
                  />
                  <h2 className='text-center text-gray-950 mt-2'>{brand.name}</h2>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
