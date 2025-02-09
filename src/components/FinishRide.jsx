import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext"; // Import socket context

const FinishRide = (props) => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext); // Access socket from context
  const ride = props.ride;

  // Get user details dynamically
  const userImage = ride?.user?.profileImage || "https://via.placeholder.com/150";
  const userName = `${ride?.user?.fullname?.firstname || "Unknown"} ${ride?.user?.fullname?.lastname || ""}`;
  const distance = ride?.distance || "Calculating...";
  const duration = ride?.duration || "Calculating...";
  const fare = ride?.fare || 0;

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log("Ride Ended Response:", response);

      if (response.status === 200) {
        navigate("/captain-home");
        socket.emit("ride-ended", ride);
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>

      {/* User Details */}
      <div className="flex items-center justify-between p-4 border-2 border-yellow-500 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img className="h-12 w-12 rounded-full object-cover" src={userImage} alt="User" />
          <h2 className="text-lg font-medium capitalize">{userName}</h2>
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
              <p className="text-sm -mt-1 text-gray-600">{duration}</p>
            </div>
          </div>

          {/* Distance */}
          <div className="flex items-center gap-5 p-3">
          <i className="ri-pin-distance-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Distance</h3>
              <p className="text-sm -mt-1 text-gray-600">{distance}</p>
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
  );
};

export default FinishRide;
