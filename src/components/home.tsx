import "./home.css";
import pancakes from "../images/pancakes.png";

const Home = () => {
  return (
    <div className="container">
      <div>
        <img src={pancakes} alt="" />
      </div>
      <div>
        <h1>
          They aren't pancakes, if they aren't <span>Golden</span>!
        </h1>
        <button>book a table</button>
        <button>contact</button>
      </div>
    </div>
  );
};

export default Home;
