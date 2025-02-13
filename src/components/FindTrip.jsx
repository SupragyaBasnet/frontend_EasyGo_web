import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import LocationSearchPanel from "./LocationSearchPanel";

const FindTrip = ({ 
  pickup, 
  setPickup, 
  destination, 
  setDestination, 
  handlePickupChange, 
  handleDestinationChange, 
  findTrip 
}) => {
  const panelRef = useRef(null);
  const [panelOpenState, setPanelOpenState] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const navigate = useNavigate();

  // ✅ Fix GSAP: Wait for the component to mount before animating
  useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [panelOpenState]);

  return (
    <div className="flex flex-col justify-end h-screen absolute p-4 top-0 bottom-0 w-full pb-14">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-gray-200 p-2 rounded-full shadow-md"
      >
        <i className="ri-arrow-left-line text-xl"></i>
      </button>

      {/* Find a Trip UI */}
      <div className="h-[30%] p-6 bg-white relative flex flex-col shadow-lg">
        <h4 className="text-2xl font-semibold">Find a trip</h4>
        <form className="relative py-3">
          <input
            onClick={() => {
              setPanelOpenState(true);
              setActiveField("pickup");
            }}
            value={pickup}
            onChange={handlePickupChange}
            className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full"
            type="text"
            placeholder="Add a pick-up location"
          />
          <input
            onClick={() => {
              setPanelOpenState(true);
              setActiveField("destination");
            }}
            value={destination}
            onChange={handleDestinationChange}
            className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-2"
            type="text"
            placeholder="Enter your destination"
          />
        </form>

        <button
          onClick={findTrip}
          className="bg-black text-white px-4 py-2 rounded-md mt-1 w-full"
        >
          Find Trip
        </button>
      </div>

      {/* Location Search Panel */}
      {panelOpenState && (
        <div ref={panelRef} className="h-auto transition-transform duration-300">
          <LocationSearchPanel
            suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpenState}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      )}
    </div>
  );
};

export default FindTrip;
