import axios from "axios"; // Import axios for API calls
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import EasyGoLogo from "../assets/EasyGo.png"; // Import the logo

import { CaptainDataContext } from "../context/CaptainContext.jsx";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

const CaptainLogin = () => {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const captain = { phonenumber, password };

    console.log("Attempting to login with:", captain);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );

      console.log("Login response:", response.data);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(message);
    } finally {
      setPhonenumber("");
      setPassword("");
    }
  };

  return (
    <div className="p-7 max-w-md mx-auto mt-10 sm:max-w-lg lg:max-w-xl">
      <form
        onSubmit={submitHandler}
        className="bg-gradient-to-b from-gray-100 to-gray-300 shadow-md rounded-lg p-5 sm:p-8"
      >
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center shadow-md">
            <img
              src={EasyGoLogo}
              alt="EasyGo Logo"
              className="h-16 w-16 rounded-full"
            />
          </div>
        </div>
        <h3 className="block text-gray-700 font-medium mb-2">
          What's our Captain's phone number?
        </h3>
        <div className="flex items-center border border-gray-400 rounded mb-4 focus-within:ring-2 focus-within:ring-blue-500">
          <span className="bg-gray-200 text-gray-500 px-3 py-3 rounded-l">
            +977
          </span>
          <input
            required
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            type="tel"
            placeholder="**********"
            className="p-3 rounded-r w-full focus:outline-none"
            pattern="[0-9]{10}"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
        <div className="flex flex-col gap-4">
          <Link
            to="/forgot-password"
            className="text-blue-600 text-center hover:underline"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded w-full hover:bg-blue-600 transition-all duration-300"
          >
            Login
          </button>
          <p className="text-center">
            New here?{" "}
            <Link
              to="/captain-signup"
              className="text-blue-600 hover:underline"
            >
              Create new account as a Rider
            </Link>
          </p>
          <button
            type="button"
            className="bg-[#d5622d] text-white px-5 py-3 rounded w-full hover:bg-orange-500 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Sign in as Passenger
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaptainLogin;
