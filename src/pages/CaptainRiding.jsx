import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  // Extracting dynamic details from ride data
  const distance = rideData?.distance || "Calculating...";
  const duration = rideData?.duration || "Calculating...";

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative overflow-x-hidden">
      {/* Header */}
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <Link
          to="/captain-home"
          className="fixed block right-2 top-2 h-7 w-7 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Ride Details Section */}
      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10">
        <h5
          className="p-1 text-center w-[95%] absolute top-0"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
      
        </h5>
        <h4 className="text-xl font-semibold">{distance} km - {duration} min </h4> {/* Dynamic Distance & Duration */}
        <button
          onClick={() => setFinishRidePanel(true)}
          className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Pop-up */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>

      {/* Live Tracking Section */}
      <div className="h-screen fixed w-screen top-0 z-[-1]">
        <LiveTracking />
      </div>
    </div>
  );
};

export default CaptainRiding;
