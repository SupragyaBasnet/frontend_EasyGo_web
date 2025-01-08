import React from "react";
import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Affordable from "./pages/Affordable";
import Safety from "./pages/Safety";
import Tracking from "./pages/Tracking";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/affordable" element={<Affordable />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper>}/>
        <Route path='/user/logout' element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>}></Route>
      </Routes>
    </div>
  );
};

export default App;
