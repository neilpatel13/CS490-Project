// src/components/ResetPasswordPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = ({ match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            await axios.post('/api/users/reset-password/' + match.params.token, { password });
            setMessage('Password successfully reset');
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={submitHandler}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
