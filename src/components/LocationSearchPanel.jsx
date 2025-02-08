import React from "react";

const LocationSearchPanel = ({ suggestions, setPickup, setDestination, activeField }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else {
      setDestination(suggestion.description);
    }
  };

  return (
    <div>
      {suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={elem.place_id || idx}
            onClick={() => handleSuggestionClick(elem)}
            className="border p-3 rounded-lg my-2 cursor-pointer hover:bg-gray-100"
          >
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-2">No suggestions available</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;

