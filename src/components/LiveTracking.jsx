import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 27.7172, // Default to Kathmandu
    lng: 85.324,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting current position:", error.message);
      }
    );

    // Watch position updates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error watching position:", error.message);
      },
      {
        enableHighAccuracy: true, // Improve accuracy
        timeout: 10000, // Set a timeout of 10s
        maximumAge: 0, // No cached positions
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      dragging={true}
      style={{ height: "100%", width: "100%" }}

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={currentPosition}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  
  );
};

export default LiveTracking;