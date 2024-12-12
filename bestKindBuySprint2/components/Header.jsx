import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logoSearch">
        <Link to="/">
          <img
            src="./public/logo.png"
            alt=""
            width={100}
            style={{ marginLeft: 40 }}
          />
        </Link>
        <input type="text" placeholder="Search.." />
      </div>

      <div className="headernav">
        <ul>
          <li>
            <a href="#">Stores</a>
          </li>
          <li>
            <a href="#">My Bestkind Account</a>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
