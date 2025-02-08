import React from "react";
import Auto from "../assets/auto.webp";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const LookingForDriver = ({ vehicleType, pickup, destination, fare, setVehicleFound }) => {
  // Function to dynamically set the vehicle image
  const getVehicleImage = () => {
    if (vehicleType === "auto") return Auto;
    if (vehicleType === "moto") return Moto;
    return WhiteCar; // Default to car
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 px-6 sm:px-10 md:px-16 overflow-y-auto">
      {/* Close Button */}
      <button
        className="absolute top-2 left-1/2 transform -translate-x-1/2 text-gray-600 text-2xl"
        onClick={() => setVehicleFound(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      {/* Header */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-center mt-12 mb-6">
        Looking for a Driver
      </h3>

      {/* Vehicle Image */}
      <div className="flex justify-center mb-6">
        <img className="h-24 sm:h-28" src={getVehicleImage()} alt={vehicleType} />
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
            <p className="text-sm text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
