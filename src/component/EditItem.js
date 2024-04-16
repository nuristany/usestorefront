import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditItem = () => {
  const { itemId } = useParams();
  const [itemData, setItemData] = useState({
    title: "",
    price: "",
    description: "",
    condition: "",
    category: "",
  });
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        const response = await axios.get(
          `https://web-production-036f.up.railway.app/store/items/${itemId}/`,
          {
            headers: {
              Authorization: `JWT ${accessToken}`,
            },
          }
        );
        console.log("ResponseData:", response.data);
        setItemData(response.data);
      } catch (error) {
        setError("Failed to fetch item details"); // Set error state
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleEdit = async () => {
    const accessToken = localStorage.getItem("access");
    try {
      await axios.put(
        `https://web-production-036f.up.railway.app/store/items/${itemId}/`,
        itemData,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      // Handle successful edit, such as displaying a success message or redirecting to another page
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      await axios.delete(
        `https://web-production-036f.up.railway.app/store/items/${itemId}/`,
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      // Handle successful deletion, such as displaying a success message or redirecting to another page
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}{" "}
      {/* Render error message if error exists */}
      <h2>Edit Item</h2>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={itemData.title}
        onChange={handleInputChange}
      />
      <label>Price:</label>
      <input
        type="text"
        name="price"
        value={itemData.price}
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <textarea
        name="description"
        value={itemData.description}
        onChange={handleInputChange}
      />
      <label>Condition:</label>
      <input
        type="text"
        name="condition"
        value={itemData.condition}
        onChange={handleInputChange}
      />
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={itemData.category}
        onChange={handleInputChange}
      />
      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={handleDelete}>Delete Item</button>
    </div>
  );
};

export default EditItem;
