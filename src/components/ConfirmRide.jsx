import React from "react";
import Auto from "../assets/auto.webp";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const ConfirmRide = ({ 
  vehicleType, 
  pickup, 
  destination, 
  fare, 
  setConfirmRidePanel, 
  setVehiclePanel, // Add this prop to handle navigation back to Choose a Vehicle screen
  setVehicleFound, 
  createRide 
}) => {
  // Function to determine the vehicle image based on type
  const getVehicleImage = () => {
    if (vehicleType === "auto") return Auto;
    if (vehicleType === "moto") return Moto;
    return WhiteCar; // Default to car
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full  z-50 px-6 sm:px-10 md:px-16 overflow-y-auto">
      {/* Dropdown Button */}
      <button
        className="absolute top-2 left-1/2 transform -translate-x-1/2 text-gray-600 text-2xl"
        onClick={() => {
          setConfirmRidePanel(false); // Close ConfirmRide panel
          setVehiclePanel(true); // Navigate back to Choose a Vehicle screen
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Header */}
      <h3 className="text-2xl font-semibold text-center mt-8 mb-6">Confirm your Ride</h3>

      {/* Vehicle Image */}
      <div className="flex justify-center mb-6">
        <img className="h-20" src={getVehicleImage()} alt={vehicleType} />
      </div>

      {/* Ride Details */}
      <div className="w-full">
        {/* Pickup Location */}
        <div className="flex items-center gap-4 p-4 border-b">
          <i className="ri-map-pin-fill text-xl text-gray-600"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup Location</h3>
            <p className="text-sm text-gray-600">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-4 p-4 border-b">
          <i className="ri-map-pin-user-fill text-xl text-gray-600"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm text-gray-600">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-4 p-4">
          <i className="ri-currency-line text-xl text-gray-600"></i>
          <div>
            <h3 className="text-lg font-medium">
              Rs.{fare?.[vehicleType] ?? "Calculating..."}
            </h3>
            
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            setVehicleFound(true); // Show the "Looking for Driver" screen
            setConfirmRidePanel(false); // Close the ConfirmRide panel
            createRide(); // Trigger ride creation
          }}
          className="w-[60%] bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
