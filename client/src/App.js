import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Headelement from "./components/Headelement";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <Headelement />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUS" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
