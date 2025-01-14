import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EasyGoLogo from "../assets/EasyGo.png"; // Import the logo
import { CaptainDataContext } from "../context/CaptainContext.jsx";


const CaptainSignup = () => {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [captainData, setCaptainData] = useState({});
  const navigate = useNavigate();

  const {captain, setCaptain}=React.useContext(CaptainDataContext)

  const submitHandler = async(e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      phonenumber: phonenumber,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)

      navigate('/captain-home')


    }


    setPhonenumber("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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

        <h3 className="text-xl font-semibold mb-4 sm:text-2xl">
          Create Rider's Account
        </h3>

        {/* Name Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            What's our Captain's Name
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
            What's our Captain's Phone Number
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Enter Password
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

        {/* Vehicle Information */}
        <h4 className="font-semibold text-gray-700 mb-3">Vehicle Information</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Vehicle Color
            </label>
            <input
              required
              type="text"
              placeholder="Enter vehicle color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Vehicle Plate
            </label>
            <input
              required
              type="text"
              placeholder="Enter vehicle plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Vehicle Capacity
            </label>
            <input
              required
              type="number"
              placeholder="Enter vehicle capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Vehicle
            </label>
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Vehicle</option>
              <option>car</option>
              <option>motorcycle</option>
              <option>auto</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded w-full hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600 hover:underline">
              Login as a Rider
            </Link>
          </p>
          <button
            type="button"
            className="bg-orange-500 text-white px-5 py-3 rounded w-full hover:bg-orange-600 transition-all duration-300"
            onClick={() => navigate("/signup")}
          >
            Sign up as Passenger
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaptainSignup;