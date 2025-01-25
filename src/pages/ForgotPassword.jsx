import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EasyGoLogo from "../assets/EasyGo.png"; // Replace with your actual logo path
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"

  const navigate = useNavigate();

  // Check password strength
  const isPasswordStrong = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

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
      setStatus("success");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
      setStatus("error");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forgot-password/verify-otp`,
        { email: email.toLowerCase(), otp },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(response.data.message || "OTP verified successfully!");
      setStatus("success");
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid or expired OTP.");
      setStatus("error");
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    if (!isPasswordStrong(newPassword)) {
      setMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setStatus("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setStatus("error");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forgot-password/reset-password`,
        { email: email.toLowerCase(), otp, password: newPassword, userType },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(response.data.message || "Password reset successfully!");
      setStatus("success");

      if (userType === "user") {
        navigate("/home");
      } else if (userType === "captain") {
        navigate("/captain-home");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password.");
      setStatus("error");
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
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Eye /> : <EyeOff />}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </span>
              </div>
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
              status === "error" ? "text-red-500" : "text-green-500"
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
