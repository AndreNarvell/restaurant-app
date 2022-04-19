import { NavLink } from "react-router-dom";
import "./contact.scss";

const Contact = () => {
  return (
    <div className="contactContainer">
      <div className="address">
        <ul>
          <li>Strålgatan 5</li>
          <li>Stockholm, Easter Island</li>
          <li>070-71337666</li>
          <li>
            <NavLink className="navLink" to="/">
              www.goldenpancakes.com
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="googleMap">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227261.7638436456!2d-109.47890024393512!3d-27.125910456708656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9947f017a8d4ae2b%3A0xbbe5b3edc02a2db6!2zUMOlc2vDtm4!5e0!3m2!1ssv!2sse!4v1649150081166!5m2!1ssv!2sse"
          loading="lazy"
        ></iframe>
      </div>

      <div className="footer-container">
        <footer>
          <ul>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                📘
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                🦤
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                📷
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
