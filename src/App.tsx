import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Booking from "./components/booking";
import Contact from "./components/contact";
import Admin from "./components/admin";
import NotFound from "./components/NotFound";
import logo from "./images/logo.png";

function App() {
  const fetchRestaurant = async () => {
    const response = await axios.get(
      "https://school-restaurant-api.azurewebsites.net/restaurant/624abd70df8a9fb11c3ea8b8"
    );
    console.log(response.data);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <NavLink to={"/"}>
            {" "}
            <img style={{ width: "100px" }} src={logo} alt="" />{" "}
          </NavLink>{" "}
          {/* <NavLink to={"/admin"}>Admin</NavLink>{" "}
          <NavLink to={"/booking"}>Booking</NavLink>{" "}
          <NavLink to={"/contact"}>Contact</NavLink> */}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
