import React, { useState } from "react";
import axios from "axios";
import EasyGoLogo from "../assets/EasyGo.png"; // Replace with your actual logo path

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forgot-password/send-otp`,
        { email, userType },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(response.data.message || "OTP sent successfully!");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forgot-password/verify-otp`,
        { email, otp },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(response.data.message || "OTP verified successfully!");
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forgot-password/reset-password`,
        { email, otp, password: newPassword, userType },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(response.data.message || "Password reset successfully!");
      setStep(1);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center shadow-md">
            <img
              src={EasyGoLogo}
              alt="EasyGo Logo"
              className="h-16 w-16 rounded-full"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1
            ? "Forgot Password"
            : step === 2
            ? "Enter OTP"
            : "Reset Your Password"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                User Type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="captain">Captain</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Failed") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
