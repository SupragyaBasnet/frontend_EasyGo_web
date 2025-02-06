import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import EasyGoLogo from "../assets/EasyGo.png";
import "remixicon/fonts/remixicon.css";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

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
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md absolute left-5 top-5"
          src={EasyGoLogo}
          alt="EasyGo Logo"
        />
        <Link
          to="/captain-home"
          className="fixed block right-2 top-2 h-7 w-7 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        {/* image for temporary use */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10">
        <h5
          className="p-1 text-center w-[95%] absolute top-0"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <i className=" text-3xl text-gray-600 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="  bg-green-600 text-white font-semibold px-20 p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
