// import axios from "axios"; // ✅ Import axios
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import Auto from "../assets/auto.webp";
// import defaultAvatar from "../assets/image.jpeg";
// import Moto from "../assets/moto.jpeg";
// import WhiteCar from "../assets/white_car.png";

// const socket = io("http://localhost:4000"); // ✅ Ensure socket is initialized

// const LookingForDriver = () => {
//   const navigate = useNavigate();
//   const [rideData, setRideData] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     socket.on("ride-confirmed", (ride) => {
//       console.log("🚖 Ride accepted:", ride);
//       setRideData(ride);
//     });

//     return () => {
//       socket.off("ride-confirmed");
//     };
//   }, []);

//   if (!rideData) {
//     return (
//       <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-white">
//         Waiting for a driver to accept...
//       </div>
//     );
//   }

//   const { captain, vehicleType, fare, rideId } = rideData || {}; // ✅ Ensure rideData is structured properly

//   const handleAccept = () => {
//     navigate("/riding", { state: rideData });
//   };

//   const handleDecline = async () => {
//     if (!rideId) {
//       console.error("❌ Error: rideId is undefined");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:4000/api/rides/cancel", { rideId });
//       console.log("✅ Ride declined by captain");
//       navigate("/home");
//     } catch (error) {
//       console.error("❌ Error declining ride:", error.response?.data || error.message);
//     }
//   };

//   const getVehicleImage = () => {
//     if (vehicleType === "auto") return Auto;
//     if (vehicleType === "moto") return Moto;
//     return WhiteCar;
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center p-6">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
//         <h3 className="text-xl font-semibold mb-4">Captain Found!</h3>
//         <div className="flex flex-col items-center">
//           <img
//             src={captain?.profilePicture 
//               ? `http://localhost:4000${captain.profilePicture}?t=${new Date().getTime()}`
//               : defaultAvatar}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
//             onClick={() => setShowProfileModal(true)} // ✅ Now works
//             onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
//           />
//           <h4 className="text-lg font-medium">
//             {captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}
//           </h4>
//         </div>
//         <img src={getVehicleImage()} alt={vehicleType} className="h-24 mx-auto my-4" />
//         <h3 className="text-xl font-semibold">Rs. {fare || "Calculating..."}</h3>
//         <p className="text-gray-600">{(captain?.vehicle?.vehicleType?.toUpperCase()) || "N/A"}</p>
//         <div className="mt-6 flex gap-4">
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full"
//             onClick={handleDecline}
//           >
//             Decline
//           </button>
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
//             onClick={handleAccept}
//           >
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LookingForDriver;



import React from "react";
import Auto from "../assets/auto.webp"; // Ensure correct paths
import Moto from "../assets/moto.jpeg";
import Car from "../assets/white_car.png";

const LookingForDriver = (props) => {
  const { pickup, destination, fare, vehicleType, setVehicleFound } = props;

  // ✅ Function to get the correct vehicle image
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
