import React from "react";
import { Route, Routes } from "react-router-dom";
import Affordable from "./pages/Affordable";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import Safety from "./pages/Safety";
import Start from "./pages/Start";
import Tracking from "./pages/Tracking";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserSignup from "./pages/UserSignup";
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
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
      </Routes>
    </div>
  );
};

export default App;
