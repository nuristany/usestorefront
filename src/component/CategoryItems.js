import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import { useNavigate } from "react-router-dom";
const CategoryItems = () => {
  const { categoryId } = useParams(); // Get categoryId from URL params
  //const [categoryName, setCategoryName] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemsForCategory = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          `https://django-rail-production-f714.up.railway.app/store/items/?category_id=${categoryId}`, // Use categoryId from URL params
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );

        setItems(response.data);
      } catch (error) {
        setError("Failed to fetch items");
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItemsForCategory();
  }, [categoryId]); // Fetch items whenever categoryId changes

  const handleBuyClick = (itemId) => {
    navigate(`/item-details/${itemId}`);
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {items.map((item) => (
          <div className="cat-items">
            <div className="cat-item-img">
              <img src={item.images[0].image} alt="" />
            </div>
            <div>
              <p>{item.title}</p>
            </div>
            <div className="buy-button">
              <button onClick={() => handleBuyClick(item.id)}>
                Click to Buy
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryItems;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // Import useParams
// import { useNavigate } from "react-router-dom";
// const CategoryItems = () => {
//   const { categoryId } = useParams(); // Get categoryId from URL params
//   //const [categoryName, setCategoryName] = useState("");
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItemsForCategory = async () => {
//       try {
//         const accessToken = localStorage.getItem("access");
//         const response = await axios.get(
//           `http://127.0.0.1:8000/store/items/?category_id=${categoryId}`, // Use categoryId from URL params
//           {
//             headers: {
//               Authorization: `JWT ${accessToken}`,
//             },
//           }
//         );

//         setItems(response.data);
//       } catch (error) {
//         setError("Failed to fetch items");
//         console.error("Error fetching items:", error.message);
//       }
//     };

//     fetchItemsForCategory();
//   }, [categoryId]); // Fetch items whenever categoryId changes

//   const handleBuyClick = (itemId) => {
//     navigate(`/item-details/${itemId}`);
//   };

//   return (
//     <div>
//       {error && <p className="error-message">{error}</p>}
//       <ul>
//         {items.map((item) => (
//           <div className="cat-items">
//             <div className="cat-item-img">
//               <img src={item.images[0].image} alt="" />
//             </div>
//             <div>
//               <p>{item.title}</p>
//             </div>
//             <div className="buy-button">
//               <button onClick={() => handleBuyClick(item.id)}>
//                 Click to Buy
//               </button>
//             </div>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryItems;
