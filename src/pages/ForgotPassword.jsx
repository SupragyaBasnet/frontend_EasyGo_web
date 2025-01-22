// import axios from "axios";
// import React, { useState } from "react";
// import EasyGoLogo from "../assets/EasyGo.png";

// const ForgotPassword = () => {
//   const [phonenumber, setPhonenumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState("");

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/send-otp`, { phonenumber });
//       setMessage(response.data.message || "OTP sent successfully!");
//       setStep(2);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send OTP.");
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     if (newPassword !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reset-password`, {
//         phonenumber,
//         otp,
//         password: newPassword,
//         userType: "user", // or "captain"
//       });
//       setMessage(response.data.message || "Password reset successfully! You can now log in.");
//       setStep(1);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to reset password.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
//         <div className="text-center mb-6">
//           <img src={EasyGoLogo} alt="EasyGo Logo" className="h-16 w-16 mx-auto rounded-full border-2 border-gray-300" />
//         </div>
//         <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
//         {step === 1 && (
//           <form onSubmit={handleSendOtp}>
//             <label className="block mb-2">Phone Number</label>
//             <input
//               type="tel"
//               className="block w-full p-2 border rounded mb-4"
//               placeholder="Enter your phone number"
//               value={phonenumber}
//               onChange={(e) => setPhonenumber(e.target.value)}
//               required
//             />
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//               Send OTP
//             </button>
//           </form>
//         )}
//         {step === 2 && (
//           <form onSubmit={handleResetPassword}>
//             <label className="block mb-2">OTP</label>
//             <input
//               type="text"
//               className="block w-full p-2 border rounded mb-4"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//             <label className="block mb-2">New Password</label>
//             <input
//               type="password"
//               className="block w-full p-2 border rounded mb-4"
//               placeholder="Enter new password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <label className="block mb-2">Confirm Password</label>
//             <input
//               type="password"
//               className="block w-full p-2 border rounded mb-4"
//               placeholder="Confirm new password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//               Reset Password
//             </button>
//           </form>
//         )}
//         {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import EasyGoLogo from "../assets/EasyGo.png";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Tracks the current step
  const [phonenumber, setPhonenumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/send-otp`, {
        phonenumber,
      });
      setMessage(response.data.message || "OTP sent successfully!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setStep(3); // Assume OTP is verified for demo purposes
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reset-password`, {
        phonenumber,
        otp,
        password: newPassword,
        userType: "user", // or "captain"
      });
      setMessage(response.data.message || "Password reset successfully! You can now log in.");
      setStep(1); // Reset to the first step
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
        <div className="text-center mb-6">
          <img src={EasyGoLogo} alt="EasyGo Logo" className="h-16 w-16 mx-auto rounded-full" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              className="block w-full p-2 border rounded mb-4"
              placeholder="Enter your phone number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <label className="block mb-2">OTP</label>
            <input
              type="text"
              className="block w-full p-2 border rounded mb-4"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              className="block w-full p-2 border rounded mb-4"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              className="block w-full p-2 border rounded mb-4"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Reset Password
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

