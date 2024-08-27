import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
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
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ display: 'block', width: '100%' }}>
                    Send Reset Code
                </button>
            </form>
            <p>{message}</p>
        </div>
        </div>
    );
};

export default ForgotPassword;
