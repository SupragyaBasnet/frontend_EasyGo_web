import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
  useEffect(() => {
    const handleConnect = () => console.log("Connected to server");
    const handleDisconnect = () => console.log("Disconnected from server");
  
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
  
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect(); // Clean up connection
    };
  }, []);
  

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
