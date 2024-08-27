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
            <h2>Verify Reset Code</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="resetCode">Reset Code:</label>
                <input
                    type="text"
                    id="resetCode"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ display: 'block', width: '100%' }}>
                    Verify Code
                </button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default VerifyCode;
