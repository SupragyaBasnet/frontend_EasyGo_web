import React from "react";

// const LocationSearchPanel = ({
//   suggestions,
//   // setVehiclePanel,
//   // setPanelOpen,
//   setPickup,
//   setDestination,
//   activeField,
// }) => {
//   const handleSuggestionClick = (suggestion) => {
//     if (activeField === "pickup") {
//       setPickup(suggestion.description);
//     } else if (activeField === "destination") {
//       setDestination(suggestion.description);
//     }
//     // setVehiclePanel(true);
//     // setPanelOpen(false);
//   };

//   return (
//     <div>
//       {/* Display fetched suggestions */}
//       {suggestions.map((elem, idx) => (
//         <div
//           key={elem.place_id || idx} // Use a unique key (e.g., place_id)
//           onClick={() => handleSuggestionClick(elem)}
//           className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
//         >
//           <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
//             <i className="ri-map-pin-fill"></i>
//           </h2>
//           <h4 className="font-medium">{elem.description}</h4>{" "}
//           {/* Extract description */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocationSearchPanel;

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description); // Use 'description' for display
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {suggestions.map((elem, idx) => (
        <div
          key={elem.place_id || idx} // Use a unique key (e.g., place_id)
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem.description}</h4>{" "}
          {/* Extract description */}
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
