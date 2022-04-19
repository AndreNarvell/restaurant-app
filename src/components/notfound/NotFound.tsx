import { Link } from "react-router-dom";
import Spacer from "../../styles/Spacer";
import "./NotFound.scss";
import sadPancake from "../../images/sad_pancake.jpg";

const NotFound = () => {
  return (
    <div className="notFoundDiv">
      <div>
        <Spacer height={150} />
        Sorry, nothing to be found here... <Spacer width={10} />
        <Link className="linkBack" to="/">
          Go back?
        </Link>
      </div>

      <div>
        <img src={sadPancake} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
