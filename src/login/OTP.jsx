// src/login/OTP.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png';

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const sentOTP = '123456'; // Simulated OTP

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === sentOTP) {
      const mobile = localStorage.getItem('mobile');
      localStorage.setItem('username', mobile);
      navigate('/dashboard');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 transition-transform hover:scale-110"
          />
          <h2 className="text-2xl font-bold text-green-700">OTP Verification</h2>
          <p className="text-sm text-gray-600 mt-1 text-center">
            Enter the 6-digit OTP sent to your mobile
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
