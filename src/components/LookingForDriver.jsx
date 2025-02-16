// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Auto from "../assets/auto.webp";
// import Moto from "../assets/moto.jpeg";
// import WhiteCar from "../assets/white_car.png";

// const LookingForDriver = ({ vehicleType, pickup, destination, fare, setVehicleFound }) => {
//   const navigate = useNavigate();
//   const [driverFound, setDriverFound] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDriverFound(true);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (driverFound) {
//       navigate("/ride-list", {
//         state: {
//           ride: {
//             vehicleType,
//             pickup,
//             destination,
//             fare: fare?.[vehicleType] ?? "Calculating...",
//           },
//         },
//       });
//     }
//   }, [driverFound, navigate, vehicleType, pickup, destination, fare]);

//   const getVehicleImage = () => {
//     if (vehicleType === "auto") return Auto;
//     if (vehicleType === "moto") return Moto;
//     return WhiteCar;
//   };


//   return (
//     <div className="fixed top-0 left-0 w-full h-full z-50 px-6 sm:px-10 md:px-16 overflow-y-auto">
//       {/* Close Button */}
//       <button
//         className="absolute top-2 left-1/2 transform -translate-x-1/2 text-gray-600 text-2xl"
//         onClick={() => setVehicleFound(false)}
//       >
//         <i className="ri-arrow-down-wide-line"></i>
//       </button>

//       {/* Header */}
//       <h3 className="text-2xl sm:text-3xl font-semibold text-center mt-12 mb-6">
//         Looking for a Driver
//       </h3>

//       {/* Vehicle Image */}
//       <div className="flex justify-center mb-6">
//         <img className="h-24 sm:h-28" src={getVehicleImage()} alt={vehicleType} />
//       </div>

//       {/* Ride Details */}
//       <div className="w-full">
//         {/* Pickup Location */}
//         <div className="flex items-center gap-4 p-4 border-b">
//           <i className="ri-map-pin-fill text-xl text-gray-600"></i>
//           <div>
//             <h3 className="text-lg font-medium">Pickup Location</h3>
//             <p className="text-sm text-gray-600">{pickup}</p>
//           </div>
//         </div>

//         {/* Destination */}
//         <div className="flex items-center gap-4 p-4 border-b">
//           <i className="ri-map-pin-user-fill text-xl text-gray-600"></i>
//           <div>
//             <h3 className="text-lg font-medium">Destination</h3>
//             <p className="text-sm text-gray-600">{destination}</p>
//           </div>
//         </div>

//         {/* Fare */}
//         <div className="flex items-center gap-4 p-4">
//           <i className="ri-currency-line text-xl text-gray-600"></i>
//           <div>
//             <h3 className="text-lg font-medium">
//               Rs.{fare?.[vehicleType] ?? "Calculating..."}
//             </h3>
//             <p className="text-sm text-gray-600">Cash Payment</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LookingForDriver;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Auto from "../assets/auto.webp";
import defaultAvatar from "../assets/image.jpeg";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const socket = io("http://localhost:4000"); // Ensure socket is initialized

const LookingForDriver = () => {
  const navigate = useNavigate();
  const [rideData, setRideData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false); // ✅ Fix undefined function

  useEffect(() => {
    // ✅ Listen for ride confirmation
    socket.on("ride-confirmed", (ride) => {
      setRideData(ride);
    });

    return () => {
      socket.off("ride-confirmed");
    };
  }, []);

  if (!rideData) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 text-white">
        Waiting for a driver to accept...
      </div>
    );
  }

  const { captain, vehicleType, fare } = rideData;

  const handleAccept = () => {
    navigate("/riding", { state: rideData });
  };

  const handleDecline = () => {
    navigate("/home");
  };

  const getVehicleImage = () => {
    if (vehicleType === "auto") return Auto;
    if (vehicleType === "moto") return Moto;
    return WhiteCar;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h3 className="text-xl font-semibold mb-4">Captain Found!</h3>
        <div className="flex flex-col items-center">
          <img
            src={captain?.profilePicture 
              ? `http://localhost:4000${captain.profilePicture}?t=${new Date().getTime()}`
              : defaultAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-primary object-cover cursor-pointer"
            onClick={() => setShowProfileModal(true)} // ✅ Now works
            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          />
          <h4 className="text-lg font-medium">
            {captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}
          </h4>
        </div>
        <img src={getVehicleImage()} alt={vehicleType} className="h-24 mx-auto my-4" />
        <h3 className="text-xl font-semibold">Rs. {fare || "Calculating..."}</h3>
        <p className="text-gray-600">{(captain?.vehicle?.vehicleType?.toUpperCase()) || "N/A"}</p>
        <div className="mt-6 flex gap-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={handleDecline}
          >
            Decline
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
