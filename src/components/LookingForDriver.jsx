import React from "react";
import Auto from "../assets/auto.webp"; // Ensure correct paths
import Moto from "../assets/moto.jpeg";
import Car from "../assets/white_car.png";

const LookingForDriver = (props) => {
  const { pickup, destination, fare, vehicleType, setVehicleFound } = props;

  // Function to get the correct vehicle image
  const getVehicleImage = () => {
    switch (vehicleType) {
      case "auto":
        return Auto;
      case "moto":
        return Moto;
      case "car":
        return Car;
      default:
        return Car; // Fallback image if vehicle type is missing
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full  z-50 px-6 sm:px-10 md:px-16 overflow-y-auto" >
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setVehicleFound(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold text-center mt-8 mb-6">Looking for Driver</h3>

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
      </div>
  );
};

export default LookingForDriver;
