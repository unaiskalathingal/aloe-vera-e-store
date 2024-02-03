import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';  
import Layout from '../../componets/layout/Layout';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/forgot-password`,
        { email }
      );

      if (res.data.success) {
        setStep(2);
        toast.success('OTP sent successfully. Check your email');
      } else {
        toast.error(res.data.message || 'An unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error('Check your email ');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const verificationRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/verify-otp`,
        { email, otp }
      );

      if (verificationRes.data.success) {
        setStep(3);
        toast.success('OTP verified successfully. You can now reset your password.');
      } else {
        toast.error(verificationRes.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred during OTP verification');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const resetRes = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/reset-password`,
        { email, otp, newPassword }
      );

      if (resetRes.data.success) {
        toast.success('Password reset successfully. You can now login with your new password.');
        navigate('/login');
      } else {
        toast.error(resetRes.data.message || 'Error resetting password');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred during password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="register">
        {/* ith send otp button click cheyyumboo loding varaan maathram aan*/}{loading && <div>Loading...</div>} {/* ith send otp button click cheyyumboo loding varaan maathram aan*/}
        
        {step === 1 && !loading && (
          <form onSubmit={handleForgetPassword}>
            <div className="mb-3">
              <input
                required={true}
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && !loading && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-3">
              <input
                required={true}
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && !loading && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <input
                required={true}
                type="password"
                className="form-control"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default ForgetPassword;
