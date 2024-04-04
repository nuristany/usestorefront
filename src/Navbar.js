import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "./images/ibuy.png";
//import React, { useState } from "react";
//import axios from "axios";

const Navbar = () => {
  //const [searchQuery, setSearchQuery] = useState("");
  //const [searchResults, setSearchResults] = useState([]);
  const { isLoggedIn } = useAuth();

  // const handleSearch = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("access");
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/shop/items/?search=${searchQuery}`,
  //       {
  //         headers: {
  //           Authorization: `JWT ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setSearchResults(response.data);
  //   } catch (error) {
  //     console.error("Error searching items:", error);
  //   }
  // };

  // const handleChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  return (
    <div className="nav">
      <Link to="/" className="logo">
        <img src={logo} alt="I-Buy Logo" className="footer-logo" />
      </Link>
      <ul className="nav-ul">
        {isLoggedIn ? (
          <div>
            <li className="nav-li">
              <Link to="/create">Create</Link>
            </li>
            <li className="nav-li">
              <Link to="/logout">Logout</Link>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
