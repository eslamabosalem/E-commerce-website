import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                localStorage.setItem('email', email);
                setMessage('A reset code has been sent to your email.');
                navigate('/verifycode');
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            setMessage('An error occurred while sending the reset code.');
        }
    };

    return (
        <div className=" container">
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2 className='text-2xl text-green-500'>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className='peer-focus:font-medium absolute text-sm text-green-500 dark:text-green-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
                />
                    <button type="submit" className="text-white bg-green-700 my-5 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">  {loading?<i className='fas fa-spinner fa-spin'></i>:" Send Reset Code"}</button>

                   
              
            </form>
            <p>{message}</p>
        </div>
        </div>
    );
};

export default ForgotPassword;
