//Logout.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  
  const handleLogout = () => {
    logout();
    // Clear the authentication token from local storage
    localStorage.removeItem("access");
    console.log(localStorage)
    console.log("local:",localStorage)
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div className="">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Logout;
