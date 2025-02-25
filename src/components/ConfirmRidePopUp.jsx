import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/image.jpeg";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const ride = props.ride || {};
  const user = ride?.user || {};

  // Get ride details

  const distance = ride?.distance || "Calculating...";
  const duration = ride?.duration || "Calculating...";
  const fare = ride?.fare || 0;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride } });
      }
    } catch (error) {
      console.error("Error starting ride:", error);
    }
  };

  return (
    <div className="min-h-[100vh] h-auto w-full bg-white p-6 rounded-t-2xl shadow-lg mt-10">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setConfirmRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>

      {/* Ride Details */}
      <div className="flex items-center justify-between p-3 border-2 border-yellow-500 rounded-lg mt-4">
        <div className="flex items-center gap-3">
        <img
            src={user?.profilePicture ? `http://localhost:4000${user.profilePicture}?t=${new Date().getTime()}` : defaultAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          />
          <h2 className="text-lg font-medium capitalize">{user?.fullname?.firstname || "Firstname"} {user?.fullname?.lastname || "Lastname"}</h2>
        </div>
        <h5 className="text-lg font-semibold">{distance} km</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          {/* Pickup */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm text-gray-600">{ride?.pickup || "Unknown"}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm text-gray-600">{ride?.destination || "Unknown"}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">Fare</h3>
              <p className="text-sm text-gray-600">Rs.{fare}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-timer-line"></i>
            <div>
              <h3 className="text-lg font-medium">Duration</h3>
              <p className="text-sm text-gray-600">{duration} min</p>
            </div>
          </div>
        </div>

        {/* Form for OTP */}
        <div className="mt-6">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <button
              type="submit"
              className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full mt-5 text-lg bg-red-600 text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
