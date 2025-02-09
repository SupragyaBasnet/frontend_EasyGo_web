import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CaptainContext from "./context/CaptainContext";
import SocketProvider from "./context/SocketContext.jsx";
import UserContext from "./context/UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>  {/* ✅ Router should wrap everything */}
      <CaptainContext>
        <UserContext>
          <SocketProvider>
            <App />
          </SocketProvider>
        </UserContext>
      </CaptainContext>
    </BrowserRouter>
  </StrictMode>
);
