import "./home.scss";
import pancakes from "../../images/pancakes.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeImg">
        <img src={pancakes} alt="pancake image" />
      </div>
      <div className="homeText">
        <h1>
          They aren't pancakes, if they aren't <span className="goldenSpan">Golden</span>!
        </h1>
        <div className="btnContainer">
        <Link to="/booking">
          <button className="primaryBtn">
            <p>book a table</p>
          </button>
        </Link>
        <Link to="/contact">
          <button className="primaryBtn">
            <p>contact</p>
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
