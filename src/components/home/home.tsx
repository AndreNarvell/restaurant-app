import "./home.scss";
import pancakes from "../../images/pancakes.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="homeImg">
        <img src={pancakes} alt="" />
      </div>
      <div className="homeText">
        <h1>
          They aren't pancakes, if they aren't <span className="golden-span">Golden</span>!
        </h1>
        <Link to="/booking">
          <button className="primary-button">
            <p>book a table</p>
          </button>
        </Link>
        <Link to="/contact">
          <button className="primary-button">
            <p>contact</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
