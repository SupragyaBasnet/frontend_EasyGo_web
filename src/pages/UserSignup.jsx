import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EasyGoLogo from "../assets/EasyGo.png"; // Import the logo
import { UserDataContext } from "../context/userContext";

const UserSignup = () => {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const {user, setUser}=React.useContext(UserDataContext)

  const submitHandler = async(e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      phonenumber: phonenumber,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)

      navigate('/home')


    }



    setPhonenumber("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="p-7 max-w-md mx-auto mt-10 sm:max-w-lg lg:max-w-xl">
      <form
        onSubmit={submitHandler}
        className="bg-gradient-to-b from-gray-100 to-gray-300 shadow-md rounded-lg p-5 sm:p-8"
      >
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center shadow-md">
            <img
              src={EasyGoLogo}
              alt="EasyGo Logo"
              className="h-16 w-16 rounded-full"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6 text-gray-800 sm:text-2xl">
          Create Your Account as a Passenger
        </h3>

        {/* Name Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            What's your Name
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white rounded px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white rounded px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Phone Number */}
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
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="p-3 rounded-r w-full focus:outline-none"
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded w-full hover:bg-blue-600 transition-all duration-300"
          >
            Create Account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <button
            type="button"
            className="bg-green-500 text-white px-5 py-3 rounded w-full hover:bg-green-600 transition-all duration-300"
            onClick={() => navigate("/captain-signup")}
          >
            Sign up as Captain
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
