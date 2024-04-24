import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Headelement from "./components/Headelement";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import SignC from "./pages/SignC";
import Order from "./pages/Order";
import SalesManagerOrders from "./pages/SalesManagerPage/orders";
import AdminSignup from "./pages/AdminSignup";
import FullDetails from "./pages/AdminPage/fullDetails";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import AdminPanel from "./pages/AdminPage/adminPanel";
import SalesManagerPanel from "./pages/SalesManagerPage/SalesManagerPanel";
import PreviousOrder from "./pages/AdminPage/previousOrder";
import LogIn from "./pages/LogIn";
import AdminLoginForm from "./components/AdminLoginForm";

import CurrentOrder from "./pages/AdminPage/currentOrder";
import OrderCalender from "./pages/AdminPage/orderCalender";

function App() {
  const [authState, setauthState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setauthState(true);
    }
  }, []);

  return (
    <div className="App">
      <Headelement />

      <AuthContext.Provider value={{ authState, setauthState }}>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutUS" element={<AboutUs />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/AdminLoginForm" element={<AdminLoginForm />} />
            <Route path="/SignC" element={<SignC />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/AdminPage" element={<AdminPanel />} />
            <Route path="/SalesManagerPage" element={<SalesManagerPanel />} />
            <Route path="/SalesManagerOrders" element={<CurrentOrder />} />
            <Route path="/AdminPage/details/:id" element={<FullDetails />} />
            <Route path="/AdminPage/CurrentOrder" element={<CurrentOrder />} />
            <Route
              path="/AdminPage/OrderCalender"
              element={<OrderCalender />}
            />
            <Route
              path="/AdminPage/PreviousOrder"
              element={<PreviousOrder />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
