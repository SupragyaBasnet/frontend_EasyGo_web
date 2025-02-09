import axios from "axios";
import React, { useState, useEffect } from "react";
import Auto from "../assets/auto.webp";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, selectVehicle, fare }) => {
  const [vehicleAvailability, setVehicleAvailability] = useState({
    car: { time: "Calculating...", riders: "..." },
    moto: { time: "Calculating...", riders: "..." },
    auto: { time: "Calculating...", riders: "..." },
  });

  useEffect(() => {
    // Fetch vehicle availability data
    const fetchVehicleAvailability = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/vehicles/availability`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.status === 200) {
          setVehicleAvailability(response.data);
        }
      } catch (error) {
        console.error("Error fetching vehicle availability:", error);
      }
    };

    fetchVehicleAvailability();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto px-4 sm:px-6 md:px-10">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 text-3xl"
        onClick={() => setVehiclePanel(false)}
      >
        &times;
      </button>

      {/* Panel Header */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-center mt-10 mb-6">
        Choose a Vehicle
      </h3>

      {/* Vehicle Options */}
      <div
        onClick={() => {
          setVehiclePanel(false);
          setConfirmRidePanel(true);
          selectVehicle("car");
        }}
        className="flex flex-col sm:flex-row items-center border-2 hover:border-black mb-4 rounded-xl w-full p-4 cursor-pointer transition"
      >
        <img className="h-14 sm:h-20" src={WhiteCar} alt="White Car" />
        <div className="ml-3 flex-grow text-center sm:text-left">
          <h4 className="font-medium text-base sm:text-lg">
            EasyGo
            <span className="ml-2 text-gray-500">
              <i className="ri-user-3-fill"></i> {vehicleAvailability.car.riders || "N/A"}
            </span>
          </h4>
          <h5 className="font-medium text-sm text-gray-600">
            {vehicleAvailability.car.time || "N/A"} away
          </h5>
          <p className="font-normal text-xs sm:text-sm text-gray-500">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold">
          Rs.{fare?.car ?? "Calculating..."}
        </h2>
      </div>

      <div
        onClick={() => {
          setVehiclePanel(false);
          setConfirmRidePanel(true);
          selectVehicle("moto");
        }}
        className="flex flex-col sm:flex-row items-center border-2 hover:border-black mb-4 rounded-xl w-full p-4 cursor-pointer transition"
      >
        <img className="h-14 sm:h-20" src={Moto} alt="Motorbike" />
        <div className="ml-3 flex-grow text-center sm:text-left">
          <h4 className="font-medium text-base sm:text-lg">
            Moto
            <span className="ml-2 text-gray-500">
              <i className="ri-user-3-fill"></i> {vehicleAvailability.moto.riders || "N/A"}
            </span>
          </h4>
          <h5 className="font-medium text-sm text-gray-600">
            {vehicleAvailability.moto.time || "N/A"} away
          </h5>
          <p className="font-normal text-xs sm:text-sm text-gray-500">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold">
          Rs.{fare?.moto ?? "Calculating..."}
        </h2>
      </div>

      <div
        onClick={() => {
          setVehiclePanel(false);
          setConfirmRidePanel(true);
          selectVehicle("auto");
        }}
        className="flex flex-col sm:flex-row items-center border-2 hover:border-black mb-4 rounded-xl w-full p-4 cursor-pointer transition"
      >
        <img className="h-14 sm:h-20" src={Auto} alt="Auto Rickshaw" />
        <div className="ml-3 flex-grow text-center sm:text-left">
          <h4 className="font-medium text-base sm:text-lg">
            UberAuto
            <span className="ml-2 text-gray-500">
              <i className="ri-user-3-fill"></i> {vehicleAvailability.auto.riders || "N/A"}
            </span>
          </h4>
          <h5 className="font-medium text-sm text-gray-600">
            {vehicleAvailability.auto.time || "N/A"} away
          </h5>
          <p className="font-normal text-xs sm:text-sm text-gray-500">
            Affordable Auto rides
          </p>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold">
          Rs.{fare?.auto ?? "Calculating..."}
        </h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
