import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auto from "../assets/auto.webp";
import defaultAvatar from "../assets/image.jpeg";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const RiderList = ({ captains = [], onAccept, onDecline }) => {
  if (!Array.isArray(captains) || captains.length === 0) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 text-white p-6">
        <h3 className="text-lg font-semibold text-center mb-6">
          No drivers available
        </h3>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 text-white p-6">
      <h3 className="text-lg font-semibold text-center mb-6">
        Likely final offers from drivers
      </h3>

      <div className="w-full max-w-md">
        {captains.map((captain, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg flex flex-col items-center w-full mb-4">
            <img
              src={captain?.profilePicture ? `http://localhost:4000${captain.profilePicture}?t=${new Date().getTime()}` : defaultAvatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-500 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
            />
            <h4 className="text-lg font-medium mt-2">{captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}</h4>
            <p className="text-2xl font-bold mt-2">Rs. {captain?.fare ?? "N/A"}</p>
            <p className="text-sm text-gray-400">{captain?.time ?? "N/A"} min • {captain?.distance ?? "N/A"} m</p>
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={() => onDecline(captain)}
                className="w-1/2 text-gray-300 bg-gray-700 p-3 rounded-lg text-lg mr-2"
              >
                Decline
              </button>
              <button
                onClick={() => onAccept(captain)}
                className="w-1/2 bg-green-500 text-white p-3 rounded-lg text-lg"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderList;
