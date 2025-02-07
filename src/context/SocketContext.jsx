// import React, { createContext, useEffect } from "react";
// import { io } from "socket.io-client";

// export const SocketContext = createContext();

// const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Backend URL

// const SocketProvider = ({ children }) => {
//   useEffect(() => {
//     console.log("Socket initialized:", socket); // Log socket instance

//     const handleConnect = () => console.log("Connected to server");
//     const handleDisconnect = () => console.log("Disconnected from server");
//     const handleError = (error) => console.error("Socket Error:", error);

//     socket.on("connect", handleConnect);
//     socket.on("disconnect", handleDisconnect);
//     socket.on("connect_error", handleError);

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("disconnect", handleDisconnect);
//       socket.off("connect_error", handleError);
//       socket.disconnect(); // Cleanup on unmount
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketProvider;

import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
