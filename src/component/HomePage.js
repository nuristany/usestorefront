// Home.js

import React, { useState, useEffect } from "react";
import HamburgerMenu from "./HumbergerMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Rating from "./Rating";
export default function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://django-rail-production-f714.up.railway.app/store/items/",
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        console.log("Data:", response.data);
        setItems(response.data);
        //console.log("Data:", response.data)
      } catch (error) {
        setError("Failed to fetch items");
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems(); // Call fetchItems when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleBuyClick = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };
  return (
    <div className="row">
      <div className="col-2">
        <HamburgerMenu />
      </div>
      <div className="col">
        <div className="main">
          <div className="container">
            {error && <p className="error-message">{error}</p>}
            {items.map((item) => (
              <div className="card-container" key={item.id}>
                <div className="card">
                  {item.images && item.images[0] && (
                    <img src={item.images[0]?.image} alt="placeholder" />
                  )}
                  <div className="card-content">
                    < Rating />
                    <p>{item.title}</p>
                    <h5>${item.price}</h5>
                  </div>
                  <div className="buy-button">
                    <button onClick={() => handleBuyClick(item.id)}>
                      Click to Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

