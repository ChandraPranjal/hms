import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LOGO from "../assests/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/authSlice";
import { clearBookings } from "../utils/bookingSlice";
import Cookies from "js-cookie"; // Import the js-cookie library

const Header = () => {
  const [searchText, setSearchText] = useState();
  const bookingItems = useSelector((state) => state.booking.bookings); //read from store redxu

  const token = useSelector((store) => store.auth.token);
  const user = token ? JSON.parse(token).user : null;
  const userName = user ? user.name : null;
  const userId = user ? user._id : null;
  const userEmail = user ? user.email : null;
  console.log("user name => ", userName);
  console.log("user id => ", userId);

  const dispatch = useDispatch(); //Redux
  const handleLogoutClick = () => {
    // dispatch(clearBookings());
    Cookies.remove("token");
    dispatch(logout());
  };
  const handleSearch = () => {
    console.log("Search Text => ", searchText);
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <img className="logo" src={LOGO} />
      </Link>
      <ul className="nav">
        <li>
          <Link to={"/cart"}>Cart - {bookingItems?.length}</Link>
        </li>
        <li>
          <Link to={"/rooms"}>Rooms</Link>
        </li>
        <li>
          {token === null ? (
            <Link to={"/auth"}>Sign in</Link>
          ) : (
            <div>
              <Link to={"/user/" + userId}>{userName}</Link>
              {" - "}
              <button onClick={() => handleLogoutClick()}> Logout</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
