import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom"; // Added this line
import CaptainDetails from "../components/CaptainDetails";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import LiveTracking from "../components/LiveTracking"; // 
import RidePopUp from "../components/RidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";


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



  // useEffect(() => {
  //   if (captain) {
      

  //     const updateLocation = () => {
  //       if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition((position) => {
  //           socket.emit("update-location-captain", {
  //             userId: captain._id,
  //             location: {
  //               lat: position.coords.latitude,
  //               lng: position.coords.longitude,
  //             },
  //           });
  //         });
  //       }
  //     };

  //     const locationInterval = setInterval(updateLocation, 10000);
  //     updateLocation();

  //     return () => clearInterval(locationInterval);
  //   }
  // }, [captain, socket]);


  const updateLocation = () => {
    if (!navigator.geolocation) {
      console.warn("❌ Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("captain id", captain._id);
        console.log("📍 Updating location...", position.coords);
  
        socket.emit("join", {
          userId: captain._id || "default-id",
          userType: "captain",
        });
        // ✅ Emit location update to backend
        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        switch (error.code) {
          case 1:
            console.error("❌ Location permission denied. Enable it in browser settings.");
            alert("Please enable location permissions.");
            break;
          case 2:
            console.error("❌ Location unavailable. Ensure GPS is ON & retrying in 5 seconds...");
            setTimeout(updateLocation, 5000); // ✅ Retry after 5 seconds
            break;
          case 3:
            console.error("❌ Location request timed out. Retrying in 3 seconds...");
            setTimeout(updateLocation, 3000); // ✅ Retry quickly
            break;
          default:
            console.error("❌ Unknown geolocation error:", error);
        }
      },
      {
        enableHighAccuracy: true, // ✅ Use GPS for better accuracy
        timeout: 30000, // ✅ Increased timeout (30s)
        maximumAge: 5000, // ✅ Allow recent location to be used
      }
    );
  };
  
  // ✅ Automatically update location every 10 seconds
  const locationInterval = setInterval(updateLocation, 10000);
  updateLocation(); // ✅ Run once immediately
  
  
  useEffect(() => {
    
    socket.on("new-ride", (rideData) => {
      setRide(rideData);
      setRidePopupPanel(true);
      setShowMap(true);
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
    <div className="h-screen w-full max-w-screen overflow-hidden flex flex-col relative">
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
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <LiveTracking />
        </div>
      )}

      {/* Captain Details and Ride Controls */}
      <div className="h-[35%] w-full bg-white p-6 absolute bottom-0 rounded-t-2xl shadow-md z-40">
        <CaptainDetails />
      </div>


      {ridePopupPanel && (
  <div
    ref={ridePopupPanelRef}
    className="absolute top-0 left-0 w-full z-50 bg-white px-3 py-6 shadow-lg transition-transform"
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
  className={`fixed inset-0 w-full h-full z-[100] bg-white px-3 py-6 shadow-lg transition-transform ${
    confirmRidePopupPanel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
  }`}
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