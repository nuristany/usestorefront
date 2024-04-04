

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          "https://web-production-036f.up.railway.app/store/category/",
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
              `https://web-production-036f.up.railway.app/store/items/?category_id=${category.id}`,
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
        `https://web-production-036f.up.railway.app/store/items/?category_id=${categoryId}`,
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

  return (
    <div className="list-group">
      <ul>
      <h2 className="collection">Collections</h2>
        {categories.map((category) => (
          <Link key={category.id} onClick={() => handleCategoryClick(category.id)}>
            <li>
              {category.name} ({category.itemCount})
            </li>
          </Link>
        ))}
      </ul>
     
    </div>
  );
};

export default CategoryPage;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const CategoryPage = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const accessToken = localStorage.getItem("access");
//         const response = await axios.get(
//           "http://127.0.0.1:8000/store/category/",
//           {
//             headers: {
//               Authorization: `JWT ${accessToken}`,
//             },
//           }
//         );
//         setCategories(response.data);

//         // Fetch all items for each category and count them
//         const categoriesWithItemCount = await Promise.all(
//           response.data.map(async (category) => {
//             const itemsResponse = await axios.get(
//               `http://127.0.0.1:8000/store/items/?category_id=${category.id}`,
//               {
//                 headers: {
//                   Authorization: `JWT ${accessToken}`,
//                 },
//               }
//             );
//             return { ...category, itemCount: itemsResponse.data.length };
//           })
//         );

//         setCategories(categoriesWithItemCount);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const fetchItemsForCategory = async (categoryId) => {
//     try {
//       const accessToken = localStorage.getItem("access");
//       const response = await axios.get(
//         `http://127.0.0.1:8000/store/items/?category_id=${categoryId}`,
//         {
//           headers: {
//             Authorization: `JWT ${accessToken}`,
//           },
//         }
//       );

//       navigate(`/category-items/${categoryId}`);
//       console.log(response)
//     } catch (error) {
//       console.error(`Error fetching items for category ${categoryId}:`, error);
//     }
//   };

//   const handleCategoryClick = (categoryId) => {
//     fetchItemsForCategory(categoryId);
//   };

//   return (
//     <div className="list-group">
//       <ul>
//       <h2 className="collection">Collections</h2>
//         {categories.map((category) => (
//           <Link key={category.id} onClick={() => handleCategoryClick(category.id)}>
//             <li>
//               {category.name} ({category.itemCount})
//             </li>
//           </Link>
//         ))}
//       </ul>
     
//     </div>
//   );
// };

// export default CategoryPage;
