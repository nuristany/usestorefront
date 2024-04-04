// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ItemDetailPage = () => {
//   const { itemId } = useParams();
//   const [item, setItem] = useState(null); // Initialize item state to null
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const accessToken = localStorage.getItem("access");
//         const response = await axios.get(
//           `https://web-production-036f.up.railway.app/store/items/${itemId}`,
//           {
//             headers: {
//               Authorization: `JWT ${accessToken}`,
//             },
//           }
//         );
//         console.log(response.data);
//         setItem(response.data); // Set item state with the fetched data
//       } catch (error) {
//         setError("Failed to fetch item");
//         console.error("Error fetching item:", error.message);
//       }
//     };

//     fetchItem(); // Call fetchItem when the component mounts
//   }, [itemId]); // Include itemId in the dependency array

//   return (
//     <section style={{ marginTop: "40px", marginLeft: "60px" }}>
//       {error && <p>Error: {error}</p>} {/* Display the error message if it exists */}
//       <div className="row">
//         {item && (
//           <div className="col-lg-5 col-md-12 col-12">
//             {item.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image.image}
//                 alt={`Item ${index + 1}`}
//                 className="small-img"
//               />
//             ))}
//           </div>
//         )}
//         <div className="detail-detail">
//           <h3>Title: {item && item.title}</h3>
//           <h3>Price: ${item && item.price}</h3>
//           <h3>Contact Number: {item && item.phone}</h3>
//           <h3>Seller: {item && item.seller_full_name}</h3>
//           <p><strong>Description:</strong>{item && item.description}</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ItemDetailPage;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null); // Initialize item state to null
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          `http://127.0.0.1:8000/store/items/${itemId}`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        setItem(response.data); // Set item state with the fetched data
      } catch (error) {
        setError("Failed to fetch item");
        console.error("Error fetching item:", error.message);
      }
    };

    fetchItem(); // Call fetchItem when the component mounts
  }, [itemId]); // Include itemId in the dependency array

  return (
    <section style={{ marginTop: "40px", marginLeft: "60px" }}>
      {error && <p>Error: {error}</p>} {/* Display the error message if it exists */}
      <div className="row">
        {item && (
          <div className="col-lg-5 col-md-12 col-12">
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image.image}
                alt={`Item ${index + 1}`}
                className="small-img"
              />
            ))}
          </div>
        )}
        <div className="detail-detail">
          <h3>Title: {item && item.title}</h3>
          <h3>Price: ${item && item.price}</h3>
          <h3>Contact Number: {item && item.phone}</h3>
          <h3>Seller: {item && item.seller_full_name}</h3>
          <p><strong>Description:</strong>{item && item.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailPage;


