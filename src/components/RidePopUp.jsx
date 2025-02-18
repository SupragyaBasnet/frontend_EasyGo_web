import React from "react";
import defaultAvatar from "../assets/image.jpeg";
import { useNavigate } from "react-router-dom";

const RidePopUp = (props) => {
  const ride = props.ride || {}; // ✅ Ensure ride is always an object
  const user = ride?.user || {}; // ✅ Extract user data safely
  const distance = ride?.distance || "Calculating...";
  const duration = ride?.duration || "Calculating...";
  const fare = ride?.fare || "Calculating...";
  const vehicleType = ride?.vehicleType || "N/A";


  return (
    <div className="min-h-[100vh] h-auto w-full bg-white p-6 rounded-t-2xl shadow-lg mt-10">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-500 rounded-lg mt-4 ">
        <div className="flex items-center gap-3 ">
          <img
            src={user?.profilePicture ? `http://localhost:4000${user.profilePicture}?t=${new Date().getTime()}` : defaultAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          />
          <h2 className="text-lg font-medium">
            {user?.fullname?.firstname || "Firstname"} {user?.fullname?.lastname || "Lastname"}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{distance} km</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup || "Unknown"}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination || "Unknown"}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">Fare</h3>
              <p className="text-sm -mt-1 text-gray-600">Rs.{fare}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-timer-line"></i>
            <div>
              <h3 className="text-lg font-medium">Duration</h3>
              <p className="text-sm -mt-1 text-gray-600">{duration} min</p>
            </div>
          </div>
        </div>
        <div className="flex mt-5 w-full items-center justify-between gap-4">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true); // ✅ Open ConfirmRidePopUp
              props.confirmRide(ride); // ✅ Pass ride data

            }}
            className="w-full bg-green-600 text-white font-semibold px-10 py-3 rounded-lg"
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
              navigate("/captain-home");
            }}
            className="w-full bg-gray-300 text-gray-700 font-semibold px-10 py-3 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;

