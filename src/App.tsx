import React from "react";
import "./App.scss";
import axios from "axios";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Booking from "./components/booking/booking";
import Contact from "./components/contact/contact";
import Admin from "./components/admin/admin";
import NotFound from "./components/notfound/NotFound";
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
        <nav className="navLogo">
          <div>
            {" "}
            <NavLink to={"/"}>
              {" "}
              <img style={{ width: "100px" }} src={logo} alt="" />{" "}
            </NavLink>{" "}
          </div>
          <ul>
            <li>
              <NavLink className="navLink" to={"/booking"}>
                Book a table
              </NavLink>
            </li>

            <li>
              <NavLink className="navLink" to={"/contact"}>
                Contact
              </NavLink>
            </li>
          </ul>
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
