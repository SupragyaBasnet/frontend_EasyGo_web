import React, { useContext } from "react";
import defaultAvatar from "../assets/image.jpeg";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain, isLoading, error } = useContext(CaptainDataContext);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading captain details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!captain) {
    return <p className="text-center text-red-500">No captain data available.</p>;
  }

  console.log("🚀 Captain Data in Component:", captain); // ✅ Debugging

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            captain?.profilePicture && captain.profilePicture.trim() !== "" 
              ? `http://localhost:4000${captain.profilePicture}?t=${Date.now()}`
              : defaultAvatar
          }
          onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
          alt="Captain"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-medium capitalize">{`${captain.fullname.firstname} ${captain.fullname.lastname}`}</h3>
          <p className="text-sm text-gray-600">Total Earnings: Rs.{captain.fare ?? "0"}</p>
        </div>
      </div>

      <div className="flex bg-gray-100 rounded-xl justify-center gap-5 items-start p-4">
        <div className="text-center">
          <h4 className="text-3xl mb-2 font-thin">{captain.distance ?? "0"}</h4>
          <p className="text-sm text-gray-600">Total Distance (km)</p>
        </div>
        <div className="text-center">
          <h4 className="text-3xl mb-2 font-thin">{captain.rideCount ?? "0"}</h4>
          <p className="text-sm text-gray-600">Rides Completed</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
