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
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutUS" element={<AboutUs />} />
            <Route path="/SignC" element={<SignC />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/AdminPage" element={<AdminPanel />} />
            <Route path="/SalesManagerPage" element={<SalesManagerPanel />} />
            <Route
              path="/SalesManagerOrders"
              element={<SalesManagerOrders />}
            />
            <Route path="/AdminPage/details/:id" element={<FullDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
