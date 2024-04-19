import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleRating(getCurrentIndex) {
    setRating(getCurrentIndex);
    console.log(getCurrentIndex);
  }

  function handleMouseMove(getCurrentIndex) {
    setHover(getCurrentIndex);
    console.log(getCurrentIndex);
  }

  function HandleMouseLeave() {
    setHover(0);
    
  }

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            className={index <= (hover || rating)? "active" : "inactive"}
            size={20}
            onClick={() => handleRating(index)}
            onMouseMove={()=>handleMouseMove(index)}
            onMouseLeave={()=>HandleMouseLeave()}
          />
        );
      })}
    </div>
  );
}
