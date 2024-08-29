import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
    const [resetCode, setResetCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');

        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, resetCode })
            });

            if (response.ok) {
                navigate(`/resetpassword?email=${encodeURIComponent(email)}&resetCode=${encodeURIComponent(resetCode)}`);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            setMessage('An error occurred while verifying the code.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' ,marginTop:"100px" }}>
            <h2 className='text-2xl text-green-500'>Verify Reset Code</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="resetCode " className='text-xl text-green-500'>Reset Code:</label>
                <input
                    type="text"
                    id="resetCode"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    required
                    className='block py-2.5 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'

                />
                    <button type="submit" className="text-white bg-green-700 my-5 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">  Verify Code</button>
                   
               
            </form>
            <p>{message}</p>
        </div>
    );
};

export default VerifyCode;
