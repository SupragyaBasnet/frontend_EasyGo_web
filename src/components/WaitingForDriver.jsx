import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auto from "../assets/auto.webp";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const WaitingForDriver = (props) => {
  const navigate = useNavigate();
  const ride = props.ride || {}; // Ensure ride is always an object
  const captain = ride?.captain || {}; // Ensure captain details exist
  const vehicle = captain?.vehicle || {}; // Ensure vehicle details exist

  // 🔍 Debugging: Log ride details
  useEffect(() => {
    console.log(" Updated ride details:", ride);
    console.log("Pickup Location:", ride.pickup);
    console.log("Destination Location:", ride.destination);
  }, [ride]);

  // Function to get the correct vehicle image
  const getVehicleImage = () => {
    const vehicleType = props.ride.captain.vehicle.vehicleType;

    switch (vehicleType) {
      case "auto":
        return Auto;
      case "moto":
        return Moto;
      case "car":
        return WhiteCar;
      default:
        return WhiteCar; // Default to car if vehicleType is missing
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full  z-50 px-6 sm:px-10 md:px-16 mt-20 overflow-y-auto">
      {/* Close Button */}
      <h5
        className="p-1 text-center w-full fixed top-0"
        onClick={() => props.setWaitingForDriver(false)}
      >
        <i className=" text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Driver & Vehicle Info */}
      <div className="flex items-center justify-between">
        <img className="h-12" src={getVehicleImage()} alt="Vehicle" />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {props.ride.captain.fullname.firstname}{" "}
            {props.ride.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{vehicle.plate}</h4>
          <p className="text-sm text-gray-600">
            {vehicle.name} {/* Dynamic Vehicle Name */}
          </p>
          <h1 className="text-lg font-semibold"> {props.otp} </h1>
        </div>
      </div>

      {/* Ride Details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          {/* Pickup Location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {ride.pickup ? ride.pickup : "Loading pickup location..."}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {ride.destination ? ride.destination : "Loading destination..."}
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium"></h3>
              <p className="text-sm -mt-1 text-gray-600">
                Rs.{props.ride.fare}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Move to Riding Button */}
      <button
        className="w-full py-3 mt-5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        onClick={() => navigate("/riding", { state: { ride: props.ride } })}
      >
        Go to Riding
      </button>
    </div>
  );
};

export default WaitingForDriver;
