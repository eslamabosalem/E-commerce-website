import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email');
    const resetCode = searchParams.get('resetCode');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, resetCode, password })
            });

            if (response.ok) {
                // Save the new password in local storage
                localStorage.setItem('userPassword', password);

                setMessage('Password has been successfully reset.');
                navigate('/');  // Redirect to the home page after success
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData); // Log error details for debugging
                setMessage(`Error: ${errorData.message || 'Please try again.'}`);
                navigate('/');  // Redirect to the home page after success

            }
        } catch (error) {
            console.error('Fetch error:', error); // Log fetch errors for debugging
            setMessage('An error occurred while resetting the password.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '60px' }}>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', fontSize: '16px' }}
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px' }}>
                    Reset Password
                </button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default ResetPassword;
