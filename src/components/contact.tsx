import { Link } from "react-router-dom";
import "./contact.scss";

const Contact = () => {
  return <>
    <div className="container">

      <div className="addressMap">
      <div className="address">
        <ul>
          <li>
            Strålgatan 5
          </li>
          <li>
            Stockholm, Easter Island
          </li>
          <li>
            070-71337666
          </li>
          <li>
            <Link to="/">www.goldpancake.com</Link>
          </li>
        </ul>
      </div>

      <div className="map">
        <iframe title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227261.7638436456!2d-109.47890024393512!3d-27.125910456708656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9947f017a8d4ae2b%3A0xbbe5b3edc02a2db6!2zUMOlc2vDtm4!5e0!3m2!1ssv!2sse!4v1649150081166!5m2!1ssv!2sse"
          width="600" height="450"
          loading="lazy">
        </iframe>
      </div>
      </div>

      <div className="footer-container">
        <footer>
          <ul>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Insta
              </a>
            </li>
          </ul>
        </footer>
      </div>

    </div>
  </>
};

export default Contact;