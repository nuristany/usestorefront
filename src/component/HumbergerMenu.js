import React, { useState,  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HamburgerMenu = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://django-rail-production-f714.up.railway.app/store/category/",
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        setCategories(response.data);

        // Fetch all items for each category and count them
        const categoriesWithItemCount = await Promise.all(
          response.data.map(async (category) => {
            const itemsResponse = await axios.get(
              `https://django-rail-production-f714.up.railway.app/store/items/?category_id=${category.id}`,
              {
                headers: {
                  Authorization: `JWT ${accessToken}`,
                },
              }
            );
            return { ...category, itemCount: itemsResponse.data.length };
          })
        );

        setCategories(categoriesWithItemCount);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchItemsForCategory = async (categoryId) => {
    try {
      const accessToken = localStorage.getItem("access");
      const response = await axios.get(
        `https://django-rail-production-f714.up.railway.app/store/items/?category_id=${categoryId}`,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      navigate(`/category-items/${categoryId}`);
      console.log(response)
    } catch (error) {
      console.error(`Error fetching items for category ${categoryId}:`, error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    fetchItemsForCategory(categoryId);
  };



  const onclickMenu = () => {
    document.querySelector("#menu").classList.toggle("icon");
    document.querySelector("#nav").classList.toggle("change");
  };

  return (
    
      <div className="navigation">
        <div className="nav-bar">
          <div id="menu" onClick={onclickMenu}>
            <div className="bar" id="bar1"></div>
            <div className="bar" id="bar2"></div>
            <div className="bar" id="bar3"></div>
          </div>
        </div>
        <ul className="nav" id="nav">
        <h2 className="collection">Collections</h2>
        {categories.map((category) => (
          <Link key={category.id} onClick={() => handleCategoryClick(category.id)}>
            <li>
              {category.name}
            </li>
          </Link>
        ))}
        </ul>
      </div>
    
  );
};

export default HamburgerMenu;
