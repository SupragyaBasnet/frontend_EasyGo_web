import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";

import CaptainDetails from "../components/CaptainDetails";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import LiveTracking from "../components/LiveTracking"; // 
import RidePopUp from "../components/RidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom"; // Added this line


const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [showMap, setShowMap] = useState(true); // 

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain, isLoading, error } = useContext(CaptainDataContext);
  const navigate = useNavigate(); // Added this line



  useEffect(() => {
    if (captain) {
      socket.emit("join", {
        userId: captain._id || "default-id",
        userType: "captain",
      });

      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          });
        }
      };

      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation();

      return () => clearInterval(locationInterval);
    }
  }, [captain, socket]);

  useEffect(() => {
    socket.on("new-ride", (rideData) => {
      setRide(rideData);
      setRidePopupPanel(true);
      setShowMap(false);
    });

    socket.on("ride-started", () => {
      setConfirmRidePopupPanel(false);
    });

    return () => {
      socket.off("new-ride");
      socket.off("ride-started");
    };
  }, [socket]);

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride?._id,
          captainId: captain?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
        socket.emit("ride-confirmed", response.data);
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  };

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );
  
  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen w-full max-w-screen overflow-hidden flex flex-col">
      {/* Settings Icon */}
    <div
      className="absolute z-[1000] flex flex-col items-center gap-2"
      style={{ top: "3%", right: "10px" }}
    >
      <button
  onClick={() => navigate("/captain-settings")} // Updated this line to use navigate
  className="bg-gray-600 text-white px-2 py-1 rounded-full shadow-md hover:bg-gray-700"
  style={{ zIndex: 1000 }}
>
  <i className="ri-settings-3-line text-xl"></i>
</button>

    </div>
      {showMap && (
        <div className="h-[65%] w-full relative overflow-hidden">
          <LiveTracking />
        </div>
      )}

      {/* Captain Details and Ride Controls */}
      <div className="h-[35%] w-full bg-white p-6 absolute bottom-0 rounded-t-2xl shadow-md">
        <CaptainDetails />
      </div>


      {ridePopupPanel && (
  <div
    ref={ridePopupPanelRef}
    className="fixed bottom-0 left-0 w-full z-50 bg-white px-3 py-6 shadow-lg transition-transform"
  >
    <RidePopUp
      ride={ride} // Pass the actual ride data
      setRidePopupPanel={setRidePopupPanel}
      setConfirmRidePopupPanel={setConfirmRidePopupPanel}
      confirmRide={confirmRide}
    />
  </div>
)}



<div
  ref={confirmRidePopupPanelRef}
  className="fixed bottom-0 left-0 w-full z-50 bg-white px-3 py-6 shadow-lg transform translate-y-full transition-transform"
>
  <ConfirmRidePopUp
    ride={ride} // Replace with actual ride data
    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
    setRidePopupPanel={setRidePopupPanel}
  />
</div>

    </div>
  );
};

export default CaptainHome;