import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const center = { lat: 27.7061835, lng: 85.3300086 }; // Default position

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    // Request the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setCurrentPosition(center); // Fallback to the default position
      }
    );

    // Watch the user's position for real-time updates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation watch error:", error.message);
      }
    );

    // Cleanup the geolocation watcher when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer center={currentPosition} zoom={15} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={currentPosition} />
    </MapContainer>
  );
};

export default LiveTracking;
