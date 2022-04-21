import "./App.scss";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

import Home from "./components/home/home";
import Booking from "./components/booking/booking";
import Contact from "./components/contact/contact";
import Admin from "./components/admin/admin";
import NotFound from "./components/notfound/NotFound";
import logo from "./images/logo.png";
import styled from "styled-components";

//Styled component
const TabButton = styled(NavLink)`
  color: #472b00;
  padding: 0 1rem 0 1rem;
  font-size: 1.5rem;
  text-decoration: none;

  &.active {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  //HTML return
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
              <TabButton className="navLink" to={"/booking"}>
                Book a table
              </TabButton>
            </li>

            <li>
              <TabButton className="navLink" to={"/contact"}>
                Contact
              </TabButton>
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
