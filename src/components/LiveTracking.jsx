import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const center = { lat: 27.7061835, lng: 85.3300086 }; // Default position

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

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
