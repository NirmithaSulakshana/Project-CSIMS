import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Headelement from "./components/Headelement";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import SignC from "./pages/SignC";
import Order from "./pages/Order";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";

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
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
