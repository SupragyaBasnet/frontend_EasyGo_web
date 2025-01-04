import React from "react";
import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Affordable from "./pages/Affordable/Affordable";
import Safety from "./pages/Safety/Safety";
import Tracking from "./pages/Tracking/Tracking";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/affordable" element={<Affordable />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </div>
  );
};

export default App;
