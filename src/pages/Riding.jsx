import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/image.jpeg";
import LiveTracking from "../components/LiveTracking";
import { SocketContext } from "../context/SocketContext";

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  console.log(location);

  // Ensure ride data is available, else redirect to home
  const ride = location.state?.ride;
  if (!ride) {
    console.error("❌ Error: No ride data found in location.state");
    navigate("/home");
    return null;
  }

  // Extract captain and vehicle details safely
  const captain = ride?.captain || {};
  const vehicleName = captain?.vehicle?.name || "Unknown Vehicle";
  const vehiclePlate = captain?.vehicle?.plate || "Unknown Plate";
  const vehicleType = captain?.vehicle?.vehicleType || "Unknown Type";

  // Extract ride details safely
  const fare = ride?.fare || "Calculating...";
  const distance = ride?.distance || "Calculating...";
  const duration = ride?.duration || "Calculating...";
  const pickup = ride?.pickup || "Unknown Pickup";
  const destination = ride?.destination || "Unknown Destination";

  // Handle payment button click
  const handlePayment = () => {
    console.log("✅ Payment initiated...");
    navigate("/payment-success");
  };

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });

    return () => {
      socket.off("ride-ended");
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen relative overflow-x-hidden">
      {/* Home Button */}
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      {/* Live Tracking */}
      <div className="h-1/2">
        <LiveTracking />
      </div>

      {/* Ride Details Section */}
      <div className="h-1/2 p-4">
        {/* Captain Details */}
        <div className="flex items-center gap-4 border-b-2 pb-4">
          <img
            src={
              captain?.profilePicture
                ? `http://localhost:4000${captain.profilePicture}?t=${new Date().getTime()}`
                : defaultAvatar
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />

          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {captain?.fullname?.firstname || "Firstname"}{" "}
              {captain?.fullname?.lastname || "Lastname"}
            </h2>
            <p className="text-sm text-gray-600">📞 {captain?.phonenumber || "No Contact"}</p>
            <p className="text-sm text-gray-600">Vehicle: {vehicleName} - {vehiclePlate}</p>
            <p className="text-sm text-gray-500">{vehicleType}</p>
          </div>
        </div>

        {/* Ride Summary */}
        <div className="w-full mt-5">
          {/* Pickup Location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination}</p>
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
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-time-line"></i>
            <div>
              <h3 className="text-lg font-medium">Duration</h3>
              <p className="text-sm text-gray-600">{duration}</p>
            </div>
          </div>

          {/* Distance */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-pin-distance-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Distance</h3>
              <p className="text-sm text-gray-600">{distance}</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button 
          onClick={handlePayment} 
          className="w-full mt-2 mb-3 bg-green-600 text-white font-semibold p-3 rounded-lg"
        >
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
