import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Headelement from "./components/Headelement";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import SignC from "./pages/SignC";
import Order from "./pages/Order";
import AdminSignup from "./pages/AdminSignup";

function App() {
  return (
    <div className="App">
      <Headelement />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUS" element={<AboutUs />} />
          <Route path="/SignC" element={<SignC />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
