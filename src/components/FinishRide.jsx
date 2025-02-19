import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext"; // Import socket context
import defaultAvatar from "../assets/image.jpeg"; // Default avatar

const FinishRide = (props) => {
  const { socket } = useContext(SocketContext); // Access socket from context
  const navigate = useNavigate();
  const ride = props.ride || {}; // ✅ Ensure ride is always an object
  const user = ride?.user || {}; // ✅ Extract user data safely

  // Extract ride details
  const distance = ride?.distance || "Calculating...";
  const duration = ride?.duration || "Calculating...";
  const fare = ride?.fare || "Calculating...";

  async function endRide() {
    try {
      console.log("🚀 Sending request to end ride with ID:", ride?._id);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
  
      console.log("✅ Ride Ended Successfully:", response.data);
  
      if (response.status === 200) {
        socket.emit("ride-ended", ride);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("❌ Frontend Error ending ride:", error.response?.data || error.message);
    }
  }
  

  return (
    <div className="relative">
      {/* Move container down from the arrow */}
      <h5
        className="p-1 text-center w-[93%] mt-2" // Added mt-2 to push content down
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Content moved down slightly */}
      <div className="mt-5"> {/* This ensures content is pushed down */}
        <h3 className="text-2xl font-semibold mt-6">Finish this Ride</h3>

        {/* User Details */}
        <div className="flex items-center justify-between p-4 border-2 border-yellow-500 rounded-lg mt-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePicture ? `http://localhost:4000${user.profilePicture}?t=${new Date().getTime()}` : defaultAvatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
            />
            <div>
              <h2 className="text-lg font-medium">
                {user?.fullname?.firstname || "Firstname"} {user?.fullname?.lastname || "Lastname"}
              </h2>
              <p className="text-sm text-gray-600">{user?.phonenumber || "No Contact"}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            {/* Pickup Location */}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Pickup</h3>
                <p className="text-sm -mt-1 text-gray-600">{ride?.pickup || "Unknown"}</p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Destination</h3>
                <p className="text-sm -mt-1 text-gray-600">{ride?.destination || "Unknown"}</p>
              </div>
            </div>

            {/* Fare */}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">Fare</h3>
                <p className="text-sm -mt-1 text-gray-600">Rs.{fare}</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-timer-line"></i>
              <div>
                <h3 className="text-lg font-medium">Duration</h3>
                <p className="text-sm -mt-1 text-gray-600">{duration} min</p>
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-5 p-3">
              <i className="ri-pin-distance-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Distance</h3>
                <p className="text-sm -mt-1 text-gray-600">{distance} km</p>
              </div>
            </div>
          </div>

          {/* Finish Ride Button */}
          <div className="mt-10 w-full">
            <button
              onClick={endRide}
              className="w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
