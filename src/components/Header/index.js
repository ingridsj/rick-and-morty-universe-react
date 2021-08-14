import { Link } from "react-router-dom";
import "./index.scss";

export function Header() {
  return (
    <div className="Header">
      <div className="first-column">
        <Link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/799px-Rick_and_Morty.svg.png" />
        </Link>
      </div>
      <div className="second-column">
        <Link to="/">Characters</Link>
        <Link to="/statistics">Statistics</Link>
      </div>
    </div>
  );
}
