// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ItemDetailPage = () => {
//   const { itemId } = useParams();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [item, setItem] = useState(null);
//   const [error, setError] = useState(null); // Include error state
//   const navigate = useNavigate();
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
//         setItem(response.data);
//       } catch (error) {
//         setError("Failed to fetch item");
//         console.error("Error fetching item:", error.message);
//       }
//     };

//     fetchItem();
//   }, [itemId]);

//   function handlePrevious() {
//     setCurrentSlide(
//       currentSlide === 0 ? item.images.length - 1 : currentSlide - 1
//     );
//   }

//   function handleNext() {
//     setCurrentSlide(
//       currentSlide === item.images.length - 1 ? 0 : currentSlide + 1
//     );
//   }

//   function handleEditClick(itemId){
//     navigate(`"/edit-item"/${itemId}`)
//   }

//   return (
//     <div className="item-detail-container">
//       {error && <div>Error: {error}</div>} {/* Render error message if error exists */}
//       <div className="right-container">
//         <div className="slider-container">
//           <BsArrowLeftCircleFill
//             onClick={handlePrevious}
//             className="arrow arrow-left"
//           />
//           {item?.images?.map((image, index) => (
//             <img
//               key={index}
//               src={image.image}
//               alt={`Item ${index + 1}`}
//               className={
//                 currentSlide === index
//                   ? "current-image"
//                   : "current-image hide-current-image"
//               }
//             />
//           ))}
//           <BsArrowRightCircleFill
//             onClick={handleNext}
//             className="arrow arrow-right"
//             />
//           <span className="circle-indicators">
//             {item?.images?.map((_, index) => (
//               <button
//               key={index}
//               className={

//                   currentSlide === index
//                     ? "current-indicator"
//                     : "current-indicator inactive-indicator"
//                 }
//                 onClick={() => setCurrentSlide(index)}
//               ></button>
//             ))}
//           </span>
//         </div>
//              <button onClick={()=>handleEditClick(item.id)}>Edit Item</button>
//       </div>
//       <div className="left-container">
//         {item && (
//           <div className="item-detail">
//             <h1 className="item-title">{item.title}</h1>
//             <h4>Price: {item.price}</h4>
//             <h4>Contact: {item.phone}</h4>
//             <h4>Seller: {item.seller_full_name}</h4>
//             <br />
//             <hr />
//             <p>
//               <strong>Description</strong>: {item.description}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemDetailPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import axios from "axios";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          `https://web-production-036f.up.railway.app/store/items/${itemId}`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );

        setItem(response.data);
      } catch (error) {
        setError("Failed to fetch item");
        console.error("Error fetching item:", error.message);
      }
    };

    fetchItem();
  }, [itemId]);

  function handlePrevious() {
    setCurrentSlide(
      currentSlide === 0 ? item.images.length - 1 : currentSlide - 1
    );
  }

  function handleNext() {
    setCurrentSlide(
      currentSlide === item.images.length - 1 ? 0 : currentSlide + 1
    );
  }

  function handleEditClick(itemId) {
    navigate(`/edit-item/${itemId}`); // Navigate to the edit page with item ID
  }

  return (
    <div className="item-detail-container">
      {error && <div>Error: {error}</div>}
      <div className="right-container">
        <div className="slider-container">
          <BsArrowLeftCircleFill
            onClick={handlePrevious}
            className="arrow arrow-left"
          />
          {item?.images?.map((image, index) => (
            <img
              key={index}
              src={image.image}
              alt={`Item ${index + 1}`}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))}
          <BsArrowRightCircleFill
            onClick={handleNext}
            className="arrow arrow-right"
          />
          <span className="circle-indicators">
            {item?.images?.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </span>
        </div>
        <div className="btn-update-container">
          <button
            className="btn-update-item"
            onClick={() => handleEditClick(item.id)}
          >
            Update
          </button>
        </div>
      </div>
      <div className="left-container">
        {item && (
          <div className="item-detail">
            <h1 className="item-title">{item.title}</h1>
            <h4>Price: {item.price}</h4>
            <h4>Contact: {item.phone}</h4>
            <h4>Seller: {item.seller_full_name}</h4>
            <br />
            <hr />
            <p>
              <strong>Description</strong>: {item.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;
