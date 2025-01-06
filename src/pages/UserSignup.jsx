import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import EasyGoLogo from "../assets/EasyGo.png"; // Import the logo

const UserSignup = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="p-7 max-w-md mx-auto mt-10 sm:max-w-lg lg:max-w-xl">
      <form className="bg-gradient-to-b from-gray-100 to-gray-300 shadow-md rounded-lg p-5 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center shadow-md">
            <img
              src={EasyGoLogo}
              alt="EasyGo Logo"
              className="h-16 w-16 rounded-full"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4 sm:text-xl">
          Create Your Account as a Passenger
        </h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            What's your First Name
          </label>
          <input
            required
            type="text"
            placeholder="Enter your first name"
            className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            What's your Last Name
          </label>
          <input
            required
            type="text"
            placeholder="Enter your last name"
            className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            What's your Phone Number
          </label>
          <div className="flex items-center border border-gray-400 rounded focus-within:ring-2 focus-within:ring-blue-500">
            <span className="bg-gray-200 text-gray-500 px-3 py-3 rounded-l">
              +977
            </span>
            <input
              required
              type="tel"
              placeholder="**********"
              className="p-3 rounded-r w-full focus:outline-none"
              pattern="[0-9]{10}"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            required
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded w-full hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <button
            type="button"
            className="bg-[#10b461] text-white px-5 py-3 rounded w-full hover:bg-green-500 transition-all duration-300"
            onClick={() => navigate("/captain-signup")} // Navigate to CaptainSignup
          >
            Sign up as Captain
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
