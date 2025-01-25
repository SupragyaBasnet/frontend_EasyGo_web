import React from "react";
import { Route, Routes } from "react-router-dom";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogin from "./pages/CaptainLogin"; // Ensure correct import
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainSignup from "./pages/CaptainSignup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Riding from "./pages/Riding";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserSignup from "./pages/UserSignup";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Start Page */}
        <Route path="/" element={<Start />} />

        {/* User Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        {/* Captain Routes */}
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
        path="/captain-home"
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }
      />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />

        {/* Riding Pages */}
        <Route path="/riding" element={<Riding />} />
      </Routes>
    </div>
  );
};

export default App;

