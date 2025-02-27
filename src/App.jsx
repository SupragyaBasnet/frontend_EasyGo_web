
import { Route, Routes } from "react-router-dom";
import LookingForDriver from "./components/LookingForDriver";
// import RiderList from "./components/RiderList";
import React, { useEffect, useState } from "react"; // Fix: Imported useState & useEffect
import AdminLogin from "./Admin/AdminLogin";
import Captains from "./Admin/Captains";
import Dashboard from "./Admin/Dashboard";
import Passengers from "./Admin/Passengers";
import Affordable from "./pages/Affordable";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainSettings from "./pages/CaptainSettings";
import CaptainSignup from "./pages/CaptainSignup";
import EasyRideRequest from "./pages/EasyRideRequest";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import PaymentSuccess from "./pages/PaymentSuccess";
import Riding from "./pages/Riding";
import Settings from "./pages/settings";
import Start from "./pages/Start";
import FastResponseTime from "./pages/FastResponseTime";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserSignup from "./pages/UserSignup";



const App = () => {
  const [daisyTheme, setDaisyTheme] = useState("light");

  useEffect(() => {
    // Load theme from localStorage and apply it globally
    const storedTheme = localStorage.getItem("daisyTheme") || "light";
    setDaisyTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);
  return (
    <Routes>
      {/* Start Page */}
      <Route path="/" element={<Start />} />
      <Route path="/affordable" element={<Affordable />} />
      <Route path="/EasyRideRequest" element={<EasyRideRequest />} />
      <Route path="/FastResponseTime" element={<FastResponseTime />} />

      {/* User Routes */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
          path="/settings"
          element={<Settings setDaisyTheme={setDaisyTheme} />}
        />
      {/* <Route path="/ride-list" element={<RiderList />} /> */}


      <Route
          path="/captain-settings"
          element={<CaptainSettings setDaisyTheme={setDaisyTheme} />}
        />
<Route path="/lookingforrider" element={<LookingForDriver />} />
<Route path="/payment-success" element={<PaymentSuccess />} />

{/* //AdminRoutes */}
<Route path="/admin_login" element={<AdminLogin />} />  {/* 🔹 Added Admin Login Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/passengers" element={<Passengers />} />
        <Route path="/admin/captains" element={<Captains />} />
  



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
      <Route path="/captain-riding" element={<CaptainRiding />} />
    </Routes>
  );
};

export default App;
