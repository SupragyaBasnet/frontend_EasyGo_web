import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import ConfirmRide from "../components/ConfirmRide";
import LiveTracking from "../components/LiveTracking";
import LocationSearchPanel from "../components/LocationSearchPanel";
import LookingForDriver from "../components/LookingForDriver";
import VehiclePanel from "../components/VehiclePanel";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
  const [pickup, setPickup] = useState("");

  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [ride, setRide] = useState(null);
  const debounceTimeout = useRef(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    }

    // Automatically fetch current location on mount
    getCurrentLocation();
  }, [user]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocoding API (OpenStreetMap's Nominatim)
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                format: "json",
                lat: latitude,
                lon: longitude,
              },
            }
          );

          const address = response.data.display_name;
          setPickup(address); // Automatically set pickup field
        } catch (error) {
          console.error("Error fetching address from coordinates:", error);
        }
      },
      (error) => {
        console.error("Error getting current location:", error.message);
      }
    );
  };

  useEffect(() => {
    socket.on("ride-confirmed", (ride) => {
      setVehicleFound(false);
      setWaitingForDriver(true); // Show "Waiting for Driver" screen
      setRide(ride);
    });
  
    socket.on("ride-started", (ride) => {
      setWaitingForDriver(false);
      navigate("/riding", { state: { ride } }); // Navigate to live tracking
    });
  
    socket.on("ride-ended", () => {
      navigate("/home"); // Navigate back to the home screen
    });
  }, []);
  
  const handlePanelState = () => {
    if (vehiclePanel || confirmRidePanel || vehicleFound || waitingForDriver) {
      setShowMap(false); // Hide map when a panel is open
    } else {
      setShowMap(true); // Show map when all panels are closed
    }
  };

  useEffect(() => {
    handlePanelState(); // Correct function name
  }, [vehiclePanel, confirmRidePanel, vehicleFound, waitingForDriver]);
  
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    const input = e.target.value;
    setDestination(input); // Update state immediately
  
    if (input.length < 3) {
      setDestinationSuggestions([]); // Clear if too short
      return;
    }
  
    // Prevent multiple rapid API requests
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input },
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
  
        // Ensure valid array response
        if (Array.isArray(response.data)) {
          setDestinationSuggestions(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setDestinationSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
        setDestinationSuggestions([]);
      }
    }, 500); // API request will be made **after 500ms**
  };

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("💵 Fare Response:", response.data);

      if (response.data && typeof response.data === "object") {
        setFare(response.data);
      } else {
        console.error(" Unexpected fare response:", response.data);
        setFare({ auto: 0, car: 0, moto: 0 });
      }
    } catch (error) {
      console.error("Error fetching fare:", error);
      setFare({ auto: 0, car: 0, moto: 0 });
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [panelOpen]);

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );
  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setFare(response.data);
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.data) {
        setRide(response.data); // Store ride details
        setVehicleFound(true); // Show "Looking for Driver" screen
  
        // Emit ride request to captains
        socket.emit("new-ride", response.data);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }
  

  return (
    <div className="h-screen w-full max-w-screen overflow-hidden flex flex-col">

      {showMap && (
        <div className="h-[65%] w-full overflow-hidden relative">
          {/* image for temporary use  */}
          <LiveTracking />
        </div>
      )}
      <div className=" flex flex-col justify-end h-screen absolute p-4 top-0 bottom-0 w-full pb-14">
        <div className="h-[30%] p-6 bg-white relative flex flex-col ">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setShowMap(false);
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
                setPanelOpen(true);
                setShowMap(false);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full  mt-2"
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
        <h5
  ref={panelCloseRef}
  onClick={() => {
    setPanelOpen(false);
    setShowMap(false); // Ensure map shows again when closing the panel
  }}
  className="absolute left-1/2 transform -translate-x-1/2 top-4 text-2xl cursor-pointer transition-all duration-300 ease-in-out"
>

</h5>


{panelOpen && (
  <div ref={panelRef} className="bg-white h-auto transition-transform duration-300">
    <LocationSearchPanel
      suggestions={
        activeField === "pickup"
          ? pickupSuggestions
          : destinationSuggestions
      }
      setPanelOpen={setPanelOpen}
      setVehiclePanel={setVehiclePanel}
      setPickup={setPickup}
      setDestination={setDestination}
      activeField={activeField}
    />
  </div>
)}
      </div>
      {vehiclePanel && (
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      )}
      {confirmRidePanel && (
  <ConfirmRide
    vehicleType={vehicleType}
    pickup={pickup}
    destination={destination}
    fare={fare}
    setConfirmRidePanel={setConfirmRidePanel} // Close ConfirmRide
    setVehiclePanel={setVehiclePanel} // Navigate back to Choose a Vehicle screen
    setVehicleFound={setVehicleFound} // Open "Looking for Driver" screen
    createRide={createRide} // Trigger ride creation
  />
)}

      {vehicleFound && (
        <LookingForDriver
          createRide={() => {}}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      )}
      {waitingForDriver && (
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      )}
    </div>
  );
};

export default Home;
